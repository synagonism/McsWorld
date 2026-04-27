/**
 * structural.js
 * Rule-based consistency checks — fast, no AI needed.
 *
 * Uses the data model from the new parser:
 *   oFileMcs → { type, filePath, fileName, oFileMcsSect, aSectMcsObj, aParaObj, oSetIdAll, aLinks }
 *   oSectMcs → { type, id, parentId, sSectTitle, nHeadingLevel, depth, 
 *                aParaObj, oParaByTitle, aNames, aLinks }
 *   oPara → { type, id, parentSectionId, text, aNames, aLinks }
 *
 * Checks:
 *  S01  FileMcs missing idOverview section
 *  S02  SectionMcs missing description:: paragraph
 *  S03  SectionMcs has description:: but it is empty (only placeholder "·")
 *  S04  SectionMcs missing name:: paragraph
 *  S05  SectionMcs name:: has zero valid Mcs* entries
 *  S06  Duplicate McsEngl bareName across entire knowledge base
 *  S07  Internal link: target file does not exist
 *  S08  Internal anchor link (#id) not found in target file's oSetIdAll
 *  S09  File missing <title> version string
 *  S10  evoluting:: dates not in YYYY-MM-DD format
 *  S11  paragraph-Mcs has no id attribute (cannot be linked to)
 *  S12  SectionMcs has no heading
 */

import path from 'path';
import fs from 'fs';
import { title } from 'process';

// ─── helpers ──────────────────────────────────────────────────────────────────

function issue(level, code, fileName, sectionOrNull, message) {
  return {
    level,
    code,
    file: fileName,
    concept: sectionOrNull?.sSectTitle ?? null,
    conceptId: sectionOrNull?.id ?? null,
    message,
  };
}

/** Build a map: relativeFilePath → Set<id>,  for anchor validation */
function buildAnchorMap(files, dirPath) {
  const oMap = new Map();
  for (const f of files) {
    const rel = path.relative(dirPath, f.filePath).replace(/\\/g, '/');
    oMap.set(rel, f.oSetIdAll);
    oMap.set(f.fileName, f.oSetIdAll); // also index by bare filename
  }
  return oMap;
}

/** Build a map: bareName → [{ fileName, id, title }] for duplicate detection */
function buildNameMap(files) {
  const oMap = new Map();
  for (const f of files) {
    // SectionMcs names
    for (const sec of f.aSectMcsObj) {
      for (const n of sec.aNameObj) {
        if (n.lang !== 'engl') continue; // only check McsEngl for duplicates
        if (!oMap.has(n.bareName)) oMap.set(n.bareName, []);
        oMap.get(n.bareName).push({ fileName: f.fileName, id: sec.id, title: sec.sSectTitle });
      }
    }
    // paragraph-Mcs names
    for (const p of f.aParaObj) {
      for (const n of p.aNameObj) {
        if (n.lang !== 'engl') continue;
        if (!oMap.has(n.bareName)) oMap.set(n.bareName, []);
        oMap.get(n.bareName).push({ fileName: f.fileName, id: p.id, title: p.sParaTitle });
      }
    }
  }
  return oMap;
}

/** Resolve an href (relative path) to { relFile, anchor } */
function resolveHref(href, fileDir, dirPath) {
  if (/^https?:\/\//.test(href)) return { external: true };
  if (href.startsWith('#')) return { external: false, relFile: null, anchor: href.slice(1) };

  const [filePart, anchor] = href.split('#');
  const abs = path.resolve(fileDir, filePart);
  const rel = path.relative(dirPath, abs).replace(/\\/g, '/');
  return { external: false, relFile: rel, anchor: anchor ?? null, absPath: abs };
}

// ─── individual checks ────────────────────────────────────────────────────────

// ❌ S01  FileMcs missing idOverview section
function checkFileMcs(files) {
  const issues = [];
  for (const f of files) {
    if (!f.oFileMcsSect) {
      issues.push(issue('ERROR', 'S01', f.fileName, null,
        `File has no <section id="idOverview"> — FileMcs identity section is missing`));
    }
  }
  return issues;
}

// ⚠️ [S02] SectionMcs  has no description:: paragraph
// ⚠️ [S03] SectionMcs  has an empty/placeholder description:: (only "·" or "×")
function checkSectionMcsDescription(files) {
  const issues = [];
  for (const f of files) {
    for (const sec of f.aSectMcsObj) {
      const descParas = sec.oParaByTitle['description'] ?? [];
      if (descParas.length === 0) {
        issues.push(issue('WARN', 'S02', f.fileName, sec,
          `SectionMcs "${sec.sSectTitle}" (${sec.id}) has no description:: paragraph`));
        continue;
      }
      // Check for empty/placeholder description (just "·" or whitespace)
      for (const p of descParas) {
        const content = p.text
          .replace(/^description::\s*/i, '')
          .replace(/[·\s×]/g, '')
          .trim();
        if (content.length === 0) {
          issues.push(issue('WARN', 'S03', f.fileName, sec,
            `SectionMcs "${sec.sSectTitle}" (${sec.id}) has an empty/placeholder description:: (only "·" or "×")`));
        }
      }
    }
  }
  return issues;
}

// ⚠️ [S04] SectionMcs  has no name:: paragraph
//⚠️  [S05] SectionMcs  name:: paragraph has no valid Mcs* entries
function checkSectionMcsName(files) {
  const issues = [];
  for (const f of files) {
    for (const sec of f.aSectMcsObj) {
      if (!sec.oParaByTitle['name']) {
        // This shouldn't happen (SectionMcs requires names), but guard anyway
        issues.push(issue('WARN', 'S04', f.fileName, sec,
          `SectionMcs "${sec.sSectTitle}" (${sec.id}) has no name:: paragraph`));
      } else if (sec.aNames.length === 0) {
        issues.push(issue('WARN', 'S05', f.fileName, sec,
          `SectionMcs "${sec.sSectTitle}" (${sec.id}) name:: paragraph has no valid Mcs* entries`));
      }
    }
  }
  return issues;
}

// ⚠️  [S12] SectionMcs  has no TITLE
function checkSectionMcsTitle(files) {
  const issues = [];
  for (const f of files) {
    for (const sec of f.aSectMcsObj) {
      if (!sec.sSectTitle || sec.sSectTitle.trim() === '') {
        issues.push(issue('WARN', 'S12', f.fileName, sec,
          `SectionMcs (${sec.id}) has no TITLE`));
      }
    }
  }
  return issues;
}

// ❌ [S06] Duplicate McsEngl-name "exmlMcsh" appears in: McsCorTest.last.html#idName, McsCorTest.last.html#idName
function checkDuplicateNames(files) {
  const issues = [];
  const nameMap = buildNameMap(files);
  for (const [bareName, occurrences] of nameMap) {
    if (occurrences.length > 1) {
      const locs = occurrences.map(o => `${o.fileName}#${o.id}`).join(', ');
      // Report once per duplicate group
      issues.push(issue('ERROR', 'S06', occurrences[1].fileName, null,
        `Duplicate McsEngl-name "${bareName}" appears in: ${locs}`));
    }
  }
  return issues;
}

function checkBrokenLinks(files, dirPath) {
  const issues = [];
  const anchorMap = buildAnchorMap(files, dirPath);
  const existingRels = new Set(
    files.map(f => path.relative(dirPath, f.filePath).replace(/\\/g, '/'))
  );

  // ❌ [S07] Broken link: FILE not found "Mcs0000008.last.html" (from "McsCorTest.last.html/../Mcs0000008.last.html#idMwsvvvv")
  // external anchors NOT ditected.
  // ⚠️ [S08] Same-file anchor #idMcshExmlprcc not found in "McsCorTest.last.html"
  // clsHide anchors NOT detected.
  for (const f of files) {
    const fileDir = path.dirname(f.filePath);
    // Check all links in the file (already deduplicated by parser)
    for (const href of f.aLinks) {
      if (!href || href === '#') continue;
      const resolved = resolveHref(href, fileDir, dirPath);
      if (resolved.external) continue;

      if (resolved.relFile) {
        // File existence check
        const exists = existingRels.has(resolved.relFile) || fs.existsSync(resolved.absPath);
        if (!exists) {
          issues.push(issue('ERROR', 'S07', f.fileName, null,
            `Broken link: FILE not found "${resolved.relFile}" (from "${f.fileName}/${href}")`));
          continue;
        }
        // Anchor check
        if (resolved.anchor) {
          const targetIds = anchorMap.get(resolved.relFile)
            ?? anchorMap.get(path.basename(resolved.relFile));
          if (targetIds && !targetIds.has(resolved.anchor)) {
            issues.push(issue('WARN', 'S08', f.fileName, null,
              `Possibly broken anchor: #${resolved.anchor} not found in "${resolved.relFile}"`));
          }
        }
      } else if (resolved.anchor) {
        // Same-file anchor
        if (!f.oSetIdAll.has(resolved.anchor)) {
          issues.push(issue('WARN', 'S08', f.fileName, null,
            `Same-file anchor #${resolved.anchor} not found in "${f.fileName}"`));
        }
      }
    }
  }
  return issues;
}

// ⚠️ [S09] File "McsCorTest.last.html" has no version string in <title> (expected e.g. McsXxx.1-2-3.2026-01-01)
// ℹ️ [S09] File "McsCorTest.last.html" version "McsCorTest.1-0.2026-04-22" does not match pattern McsXxx.N-N-N.YYYY-MM-DD
function checkVersionString(files) {
  const issues = [];
  for (const f of files) {
    if (!f.version) {
      issues.push(issue('WARN', 'S09', f.fileName, null,
        `File "${f.fileName}" has no version string in <title> (expected e.g. McsXxx.1-2-3.2026-01-01)`));
    } else if (!f.version.match(/Mcs\w+\.\d+-\d+-\d+\.\d{4}-\d{2}-\d{2}/)) {
      issues.push(issue('INFO', 'S09', f.fileName, null,
        `File "${f.fileName}" version "${f.version}" does not match pattern McsXxx.N-N-N.YYYY-MM-DD`));
    }
  }
  return issues;
}

// ⚠️ [S10] DATE has NO {YYYY-MM-DD} format in line: "· {2022-4-27} evoluting ..."
// in file: "McsCorTest.last.html"
function checkDates(files) {
  const issues = [];
  const goodDate1 = /\{\d{4}-\d{2}-\d{2}\}/;
  const goodDate2 = /\{\d{4}-\d{2}\}/;
  const goodDate3 = /\{\d{4}\}/;
  for (const f of files) {
    for (const sec of f.aSectMcsObj) {
      for (const p of sec.aParaObj) {
        for (const line of p.text.split('\n')) {
          if (/\{[\d-]*\}/.test(line) &&
             !goodDate1.test(line) && !goodDate2.test(line) && !goodDate3.test(line)) {
            issues.push(issue('WARN', 'S10', f.fileName, sec,
              `DATE has NO {YYYY-MM-DD} format in line: "${line.trim()}" in file: "${f.fileName}"`));
          }
        }
      }
    }
  }
  return issues;
}

// ─── main export ──────────────────────────────────────────────────────────────

export function runStructuralChecks(files, dirPath) {
  const all = [];

  process.stdout.write('   S01    File-Mcs (idOverview)... ');
  const fm = checkFileMcs(files);
  all.push(...fm);
  console.log(`${fm.length} issues`);

  process.stdout.write('   S02/S03 Section descriptions... ');
  const sd = checkSectionMcsDescription(files);
  all.push(...sd);
  console.log(`${sd.length} issues`);

  process.stdout.write('   S04/S05 Section names... ');
  const sn = checkSectionMcsName(files);
  all.push(...sn);
  console.log(`${sn.length} issues`);

  process.stdout.write('   S12    Section headings... ');
  const sh = checkSectionMcsTitle(files);
  all.push(...sh);
  console.log(`${sh.length} issues`);

  process.stdout.write('   S06    Duplicate McsEngl names... ');
  const dn = checkDuplicateNames(files);
  all.push(...dn);
  console.log(`${dn.length} issues`);

  process.stdout.write('   S07/S08 Broken links & anchors... ');
  const bl = checkBrokenLinks(files, dirPath);
  all.push(...bl);
  console.log(`${bl.length} issues`);

  process.stdout.write('   S09    Version strings... ');
  const vs = checkVersionString(files);
  all.push(...vs);
  console.log(`${vs.length} issues`);

  process.stdout.write('   S10    Evoluting dates... ');
  const ev = checkDates(files);
  all.push(...ev);
  console.log(`${ev.length} issues`);

  return all;
}
