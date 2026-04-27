/**
 * parser.js
 * Parses MCS .last.html files into structured JavaScript objects.
 *
 * The three Mcs types in the whole-part structure:
 *
 *  1) file-Mcs
 *     The file itself is a concept. Its identity is in <section id="idOverview">.
 *     - <title> holds the canonical name + version string
 *     - <section id="idOverview"> contains the file's description:: and name:: paragraphs
 *
 *  2) SectionMcs   (the main type)
 *     Every <section id="idXxx"> that contains a <p> whose text starts with "name::"
 *     and has at least one Mcs* entry is a SectionMcs. Structure:
 *     - id                 the section's id= attribute
 *     - sSectTitle         text of the first <h1|h2|h3|h4> in the section
 *     - nHeadingLevel      1–9
 *     - depth              nesting depth (0 = top-level <section>)
 *     - parentId           id of the enclosing <section>, or null
 *     - aParaObj           all <p> elements directly in this section
 *     - oParaByTitle       paragraphs indexed by their keyword (e.g. "description", "name")
 *     - aNames             parsed Mcs* entries from the name:: paragraph
 *     - aLinks             all hrefs found in this section
 *
 *  3) paragraph
 *     A <p id="idXxx"> that does NOT have a known section-keyword (description::, name::…)
 *     but contains at least one "* McsEngl." or "* McsElln." name entry.
 *     These are inline concept-anchors embedded inside a section's content.
 *     - id, parentSectionId, text, aNames, aLinks
 *
 * Returned per file:
 * {
 *   type: 'FileMcs',
 *   filePath, fileName, fileDirName,
 *   sFileTitle,     // text from <title> (name part only)
 *   version,        // e.g. "McsCor000015.1-4-0.2026-03-30"
 *   oFileMcsSect,   // the idOverview SectionMcs (= the file's own concept)
 *   aSectMcsObj,    // all SectionMcs objects
 *   aParaObj,       // all paragraph objects
 *   oSetIdAll,      // Set<string> of every id= in the file (for link checking)
 *   aLinks,        // all unique hrefs in the file (content links only)
 *   error           // set if the file could not be read
 * }
 */

import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { type } from 'os';

const
  aVersion = [
    'parser.js.0-1-0.2026-04-24: creation'
  ]

// ─── HTML utilities ───────────────────────────────────────────────────────────

/** Strip all HTML tags, decode basic entities, collapse whitespace.
 *  <br> tags are converted to \n FIRST so that name-entry lines stay separate.
 */
function stripTags(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')   // <br> → newline BEFORE stripping other tags
    .replace(/<[^>]+>/g, ' ')        // remove all other tags, replace with space to avoid word-joining
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/[ \t]{2,}/g, ' ')      // collapse only horizontal whitespace, keep \n
    .replace(/\n[ \t]+/g, '\n')      // trim leading spaces on each line
    .trim();
}

/** Extract all id= values from a block of HTML
 *  OUTPUT: Set<string> of all id= values found, for link-checking against hrefs later.
*/
function extractIds(html) {
  const re = /\bid="([^"]+)"/g;
  const oSetIds = new Set();
  let m;
  while ((m = re.exec(html)) !== null) oSetIds.add(m[1]);
  return oSetIds;
}

/**
 * INPUT: a block of HTML content.
 * OUTPUT: array of all href=values.
 */
function extractContentHrefs(html) {
  // Remove clsHide anchors entirely first
  const cleaned = html.replace(/<a\s+class="clsHide"[^>]*>[\s\S]*?<\/a>/g, '');
  const re = /href="([^"]+)"/g;
  const aLinks = [];
  let m;
  while ((m = re.exec(cleaned)) !== null) aLinks.push(m[1]);
  return [...new Set(aLinks)]; // array unique hrefs only
}

// ─── Mcs name-entry parser ────────────────────────────────────────────────────

/**
 * INPUT: text of a paragraph.
 * OUTPUT: array of name objects.
 *   { raw, bareName, lang }
 */
function parseNameEntries(text) {
  const aNameObj = [];
  for (const line of text.split('\n')) {
    // A name entry line: "    * McsEngl.McshExml'att001 attribute, {2026-04-23}" 
    const m = line.match(/\* (Mcs[^\n,]+),/);
    if (!m) continue;
    const sRawName = m[1]; // "McsEngl.McshExml'att001 attribute"

    let lang = 'other';
    if (sRawName.startsWith('McsEngl.')) lang = 'engl';
    else if (sRawName.startsWith('McsElln.')) lang = 'elln';
    else if (sRawName.startsWith('McsSngu.')) lang = 'sngu';


    // bareName: everything before the operator (or full string if none)
    const sBareName = sRawName.split('!⇒')[0].substr(8).trim(); // .split('!⇒')[0].trim();

    aNameObj.push({ raw: sRawName, bareName: sBareName, lang });
  }
  return aNameObj;
}

// ─── paragraph parser ─────────────────────────────────────────────────────────

/**
 * Parse a single <p ...>...</p> HTML string.
 * Returns one object para:
 * {
 *   type: 'Paragraph | ParagraphMcs',
 *   id,            // value of id= attribute, or null
 *   sParaTitle,    // keyword before "::" in the first text line, lowercased, or null
 *   text,          // full plain text content
 *   aNames,         // array of object-names
 *   aLinks,        // content hrefs
 * }
 */
function parseParagraph(pHtml) {
  // id= attribute
  const idM = pHtml.match(/<p\b[^>]*\bid="([^"]+)"/);
  const id = idM ? idM[1] : null;
  // console.log(`Parsing paragraph id=${id}`);

  // Remove the clsHide self-anchor at the end (always the last <a> in a <p>)
  const inner = pHtml
    .replace(/^<p[^>]*>/, '')
    .replace(/<\/p>\s*$/, '')
    .replace(/<a\s+class="clsHide"[^>]*>[\s\S]*?<\/a>/g, '');

  const text = stripTags(inner);

  // sParaTitle: first "text::" pattern
  const keyM = text.match(/^([^:\n]+)::/);
  const sParaTitle = keyM ? keyM[1].trim() : null;

  // hrefs (content only)
  const aLinks = extractContentHrefs(inner);

  // Name entries — parse regardless of sParaTitle, so paragraph-Mcs can be detected
  const aNameObj = parseNameEntries(text);
  const aNames = aNameObj.map(o => o.bareName);

  // A paragraph-Mcs: has an id AND has Mcs* names AND is NOT a name:: paragraph
  // (name:: paragraphs belong to the SectionMcs, not a separate concept)
  const bIsParaMcs = id !== null
    && aNameObj.length > 0
    && sParaTitle !== 'name';

  if (bIsParaMcs) {
    return { type: 'ParagraphMcs', id, sParaTitle, text, aNameObj, aNames, aLinks: aLinks };
  } else {
    return { type: 'Paragraph', id, sParaTitle, text, aNameObj, aNames, aLinks: aLinks };
  }
}

// ─── section splitter ─────────────────────────────────────────────────────────

/**
 * INPUT: raw HTML and extract every <section> block with its nesting info.
 * OUTPUT: array of { id, rawHtml, depth, parentId } in document order,
 * ordered from outermost to innermost (i.e. whole appears before its parts).
 */
function splitSections(html) {
  const aSectionObj = [];
  const stack = []; // { id, start, depth }
  const rTagSecAtt = /<\/?section\b([^>]*)>/gi;
  let m;

  while ((m = rTagSecAtt.exec(html)) !== null) {
    const full = m[0];
    const attrs = m[1] ?? '';
    const isClose = full.startsWith('</');

    if (!isClose) {
      const idM = attrs.match(/\bid="([^"]+)"/);
      stack.push({ id: idM ? idM[1] : null, start: m.index, depth: stack.length });
    } else {
      const top = stack.pop();
      if (!top) continue;
      const parentId = stack.length > 0 ? stack[stack.length - 1].id : null;
      aSectionObj.push({
        id: top.id,
        rawHtml: html.slice(top.start, m.index + full.length),
        depth: top.depth,
        parentId,
      });
    }
  }
  return aSectionObj;
}

/**
 * Given the rawHtml of a section, return only the "outer" HTML —
 * i.e. with all DIRECT child <section>...</section> blocks replaced by empty strings.
 * This is done iteratively (not with a greedy regex) to handle nesting correctly.
 * Returns a-string of outer heading and paragraphs only.
 */
function outerHtmlOf(rawHtml) {
  // We strip sections that are direct children only.
  // Strategy: track depth manually and blank out nested sections.
  const result = [];
  let depth = 0;
  let inOwnSection = false; // have we passed the opening tag of rawHtml itself?
  const rTagSec = /<\/?section\b[^>]*>/gi;
  let last = 0;
  let m;

  // The rawHtml starts with the opening <section> of the section itself.
  // depth 0 = inside this section's own content
  // depth 1 = inside a direct child <section>
  // We want to include text at depth 0, exclude depth >= 1.

  rTagSec.lastIndex = 0;
  while ((m = rTagSec.exec(rawHtml)) !== null) {
    const tag = m[0];
    const isClose = tag.startsWith('</');

    if (!inOwnSection) {
      // First tag is the opening of the section itself — skip it
      inOwnSection = true;
      last = m.index + tag.length;
      continue;
    }

    if (!isClose) {
      if (depth === 0) {
        // About to enter a child section: include text before it
        result.push(rawHtml.slice(last, m.index));
        last = m.index;
      }
      depth++;
    } else {
      depth--;
      if (depth === 0) {
        // Just closed a child section: skip its content
        last = m.index + tag.length;
      } else if (depth < 0) {
        // Closing our own section
        result.push(rawHtml.slice(last, m.index));
        last = m.index + tag.length;
        break;
      }
    }
  }

  // Anything remaining at depth 0
  if (last < rawHtml.length && depth === 0) {
    result.push(rawHtml.slice(last));
  }

  // returns a-string of outer heading and paragraphs only, with all nested sections removed
  return result.join('');
}

// ─── section parser ───────────────────────────────────────────────────────────

/**
 * INPUT: one RawSect-opbect.
 * OUTPUT: one Sect-object.
 * We only parse paragraphs that are DIRECTLY in this section, not inside
 * nested child <section> elements, to avoid double-counting.
 */
function parseSection({ id, rawHtml, depth, parentId }) {
  //console.log(`   Parsing section: id=${id} depth=${depth} parentId=${parentId}`);
  // "Outer HTML": the section's own content with nested <section>...</section>
  // blocks removed, so paragraph parsing only hits direct-child <p> elements.
  const sOuterSect = outerHtmlOf(rawHtml);  // "<h? id=... <p ...</a></p>"
  // console.log(`     Outer: ${sOuterSect}`);

  // Heading: first <h1|h2|h3|..|h9> in outer
  const hM = sOuterSect.match(/<h([1-9])\b[^>]*>([\s\S]*?)<\/h\1>/i);
  const sSectTitle  = hM ? stripTags(hM[2]) : '';
  const nHeadingLevel = hM ? parseInt(hM[1]) : 1;

  // All direct-child paragraphs
  const aSectPara = [];
  const rPara = /<p\b[^>]*>[\s\S]*?<\/p>/gi;
  let pm;
  while ((pm = rPara.exec(sOuterSect)) !== null) {
    const p = parseParagraph(pm[0]);
    aSectPara.push(p);
  }

  // Index paragraphs by title for quick lookup
  const oParaByTitle = {};
  for (const p of aSectPara) {
    if (p.sParaTitle) {
      if (!oParaByTitle[p.sParaTitle]) oParaByTitle[p.sParaTitle] = [];
      oParaByTitle[p.sParaTitle].push(p);
    }
  }

  // Name entries — from the name:: paragraph(s) only
  const aNames = (oParaByTitle['name'] ?? []).flatMap(p => p.aNames);
  const aNameObj = (oParaByTitle['name'] ?? []).flatMap(p => p.aNameObj);

  // All content hrefs across the entire section (including nested children)
  const aLinks = extractContentHrefs(rawHtml);

  return {
    type: 'SectionMcs',
    id,
    sSectTitle,
    nHeadingLevel,
    depth,
    parentId,
    aParaObj: aSectPara,
    oParaByTitle,
    aNameObj,
    aNames,
    aLinks,
  };
}

// ─── public file parser ───────────────────────────────────────────────────────
/**
 * INPUT: one McsFile given its path.
 * OUTPUT: one FileMcs-object:
 * {
 *   type: 'FileMcs',
 *   filePath, fileName, fileDirName,
 *   sFileTitle,     // text from <title> (name part only)
 *   version,        // e.g. "McsCor000015.1-4-0.2026-03-30"
 *   oFileMcsSect,   // the file's own concept (usually the idOverview section)
 *   aSectMcsObj,    // array of all SectionMcs objects in the file
 *   aParaObj,       // array of all paragraph objects in the file
 *   oSetIdAll,      // Set<string> of every id= in the file (for link checking)
 *   aLinks,         // array of all content hrefs in the file
 * }
 */
export function parseFile(filePath) {
  //  filePath: C:\xampp\htdocs\dWstSgm\dirMcs\dirCor\McsCor000015.last.html
  let sFileRaw;
  try {
    sFileRaw = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return {
      type: 'FileMcs',
      filePath,
      fileName: path.basename(filePath), // McsCor000015.last.html
      fileDirName: path.basename(path.dirname(filePath)), // dirCor
      error: e.message,
      oFileMcsSect: null,
      aSectMcsObj: [],
      aParaObj: [],
      oSetIdAll: new Set(),
      aLinks: [],
    };
  }

  // ── <title> ──────────────────────────────────────────────────────────────
  const titleM = sFileRaw.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const titleRaw = titleM ? stripTags(titleM[1]) : '';
  const versionM = titleRaw.match(/\(([^)]+)\)/);
  const version  = versionM ? versionM[1].trim() : null;
  const sFileTitle = titleRaw.replace(/\s*\([^)]*\)\s*/g, '').trim();

  // ── all id= values (for broken-anchor checking) ───────────────────────────
  const oSetIdAll = extractIds(sFileRaw);

  // ── all content hrefs in the file ────────────────────────────────────────
  const aLinks = extractContentHrefs(sFileRaw);

  // ── split into sections ───────────────────────────────────────────────────
  const aRawSections = splitSections(sFileRaw);

  const aSectionMcs    = [];
  const aParaObj  = [];
  // file-Mcs = the idOverview section (always the file's own concept)
  let oFileMcsSect = null;

  for (const oRawSec of aRawSections) {
    // Skip infrastructure sections
    if (oRawSec.id === 'idMeta' || oRawSec.id === 'idHeader'
       || oRawSec.id === 'idSupport' || oRawSec.id === 'idComment') continue;

    // Parse as a SectionMcs candidate
    const sec = parseSection(oRawSec);
    // console.log(`Parsed section id=${sec.id} title="${sec.sSectTitle}" with ${sec.aNames.length} names and ${sec.aParaObj.length} paragraphs.`);
    if (sec.type === 'SectionMcs') aSectionMcs.push(sec);
    if (sec.id === 'idOverview') oFileMcsSect = sec;

    // Collect paragraph-Mcs from this section's direct paragraphs
    const outer2 = outerHtmlOf(oRawSec.rawHtml);
    const pRe2 = /<p\b[^>]*>[\s\S]*?<\/p>/gi;
    let pm;
    while ((pm = pRe2.exec(outer2)) !== null) {
      aParaObj.push(parseParagraph(pm[0]));
    }
  }

  return {
    type: 'FileMcs',
    filePath,
    fileName: path.basename(filePath),
    fileDirName: path.basename(path.dirname(filePath)),
    sFileTitle,
    version,
    oFileMcsSect,
    aSectMcsObj: aSectionMcs,
    aParaObj,
    oSetIdAll,
    aLinks,
  };
}

// ─── directory scanner ────────────────────────────────────────────────────────

export function parseAllFiles(dirPath) {
  let aFilePaths;
  try {
    const pattern = path.join(dirPath, '**/*.last.html').replace(/\\/g, '/');
    aFilePaths = globSync(pattern, { ignore: '**/node_modules/**' });
  } catch {
    aFilePaths = walkDir(dirPath);
  }
  // returns array of FileMcs-objects
  return aFilePaths.map(fp => parseFile(fp));
}

function walkDir(dir) {
  let results = [];
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(walkDir(full));
    } else if (item.endsWith('.last.html')) {
      results.push(full);
    }
  }
  return results;
}
