/*
 * version.last: hitp.js (2013.06.29 minor 2013.06.29)
 * version.this: /hitp/hitp.2013.06.29.js (last hitp-dir)
 * version.previous: /hit/hit.2013.06.18.js (name hit)
 * version.previous: toc.2013.05.30.js (section id)
 * version.previous: toc.2013.04.19.js (JSLint ok)
 * version.previous: toc.2013.04.14.js (preview links)
 * version.previous: toc.2013.04.07.js (button expand|collapse)
 * version.previous: toc.2013.04.05.js (toc scrolls to highlited)
 * version.previous: toc.2013.04.04.js (goes click location)
 * version.previous: toc.2013.04.01.js (toc on any browser)
 * version.previous: 2010.12.06 (toc on chrome)
 *
 * toc.js - HTML5.ID.ToC text-format code.
 * This code is the result of the evolution of my
 * a) TableOfContents chrome extention (https://chrome.google.com/webstore/detail/tableofcontents/eeknhipceeelbgdbcmchicoaoalfdnhi)
 * and
 * b) synagonism-mw MediaWiki skin (http://synagonism-mw.sourceforge.net/)
 *
 * LGPLv3 license
 * Copyright (C) 2010-2013 Kaseluris.Nikos.1959,
 * kaseluris.nikos@gmail.com
 * users.otenet.gr/~nikkas/
 *
 *
 ***************************** HTML5-outliner ****************************
 * https://chrome.google.com/extensions/detail/afoibpobokebhgfnknfndkgemglggomo
 *
 * The MIT License
 * Copyright (c) 2010 Dominykas Blyžė
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 ***************************** DHTMLgoodies *****************************
 *
 * To create the expandable-tree I modified code from
 * http://www.dhtmlgoodies.com/
 */


/* toc-tree variables */
var hitTocNoIdTreeLi;

/* Returns an html-ul-element that holds the outline.
 * <ul id = "idTocTree">
 *   <li id = "idTocTreeLI1"><img src = "...png"><a href = "#h5o-1" title = "...">...</a>
 *   ...
 *   </li>
 * </ul>
 * From HTML5-Outliner: https://chrome.google.com/extensions/detail/afoibpobokebhgfnknfndkgemglggomo */
function funH5oGetOutlineHtml() {
  var h5oElmCurrentOutlinee, h5oElmDocumentRoot, h5oSemSectionCurrent,
    h5oArStack, h5oNoCounterLink, objOutline;

  function funH5oIsElement(obj) {
    return obj && obj.tagName;
  }

  /* minifiers will love this more than using el.tagName.toUpperCase() directly */
  function funH5oGetTagName(elm) {
    return elm.tagName.toUpperCase();
    /* upper casing due to http://ejohn.org/blog/nodename-case-sensitivity/ */
  }

  /* http://dev.w3.org/html5/spec/Overview.html#sectioning-root */
  function funH5oIsElmSectioningRoot(elm) {
    return funH5oIsElement(elm) &&
           (new RegExp('^BLOCKQUOTE|BODY|DETAILS|FIELDSET|FIGURE|TD$', "i")).test(funH5oGetTagName(elm));
  }

  /* http://dev.w3.org/html5/spec/Overview.html#sectioning-content */
  function funH5oIsElmSectioningContent(elm) {
    return funH5oIsElement(elm) &&
            (new RegExp('^ARTICLE|ASIDE|NAV|SECTION$', "i")).test(funH5oGetTagName(elm));
  }

  /* http://dev.w3.org/html5/spec/Overview.html#heading-content */
  function funH5oIsElmHeading(elm) {
    return funH5oIsElement(elm) &&
            (new RegExp('^H[1-6]|HGROUP$', "i")).test(funH5oGetTagName(elm));
  }

  function funH5oGetHeadingElmRank(el) {
    var elTagName = funH5oGetTagName(el), i;
    if (elTagName === 'HGROUP') {
      /* The rank of an hgroup element is the rank of the highest-ranked
       * h1-h6 element descendant of the hgroup element,
       * if there are any such elements, or otherwise the same as for
       * an h1 element (the highest rank). */
      for (i = 1; i <= 6; i += 1) {
        if (el.getElementsByTagName('H' + i).length > 0) {
          return -i;
        }
      }
    } else {
      return -parseInt(elTagName.substr(1), null);
    }
  }

  /* returns the text of heading of a sem-section */
  function funH5oGetSectionHeadingText(elmHeading) {
    var sEmpty = '', sTxt;
    if (funH5oIsElmHeading(elmHeading)) {
      if (funH5oGetTagName(elmHeading) === 'HGROUP') {
        elmHeading = elmHeading.getElementsByTagName('h' + (-funH5oGetHeadingElmRank(elmHeading)))[0];
      }
      /* @todo: try to resolve text content from img[alt] or *[title] */
      sTxt = elmHeading.textContent;
      /* removes from heading the "classHide" content */
      sTxt = sTxt.replace(/\n *¶$/, "");
      return sTxt
        || elmHeading.innerText
        || "<i>No text content inside " + elmHeading.nodeName + "</i>";
    }
    return sEmpty + elmHeading;
  }

  /* sets an id in an element, if it does not has one */
  function funH5oGenerateId(elm) {
    var id = elm.getAttribute('id');
    if (id) {
      return id;
    }

    /* toc-extension has 2 div-elm, one for toc and one to content.
     * this way the begining of content is NOT the body-element.
     * Thus I put the first id, in its first heading-element. */
    if (funH5oGetTagName(elm) === 'BODY') {
      id = 'h5o-1';
      if (elm.getElementsByTagName("header").length > 0) {
        elm.getElementsByTagName("header")[0].setAttribute('id', id);
      } else if (elm.getElementsByTagName('h1').length > 0) {
        elm.getElementsByTagName('h1')[0].setAttribute('id', id);
      } else if (elm.getElementsByTagName('h2').length > 0) {
        elm.getElementsByTagName('h2')[0].setAttribute('id', id);
      }
      return id;
    }

    do {
      id = 'h5o-' + (h5oNoCounterLink += 1);
    } while (h5oElmDocumentRoot.getElementById(id));
    elm.setAttribute('id', id);
    return id;
  }

  function funH5oGetSectionListAsHtml(sections) {
    var retval = '', i;
    for (i = 0; i < sections.length; i += 1) {
      retval += '<li>' + sections[i].ssFAsHTML() + '</li>';
    }
    return (retval === '' ? retval : '<ul>' + retval + '</ul>');
  }

  /* A semantic-section (ss) class */
  function FunH5oSemSection(elmStart) {
    this.ssArSections = [];
    this.ssElmStart = elmStart;
    /* the heading-element of this semantic-section */
    this.ssElmHeading = false;

    this.ssFAppend = function (what) {
      what.container = this;
      this.ssArSections.push(what);
    };
    this.ssFAsHTML = function () {
      var headingText = funH5oGetSectionHeadingText(this.ssElmHeading);
      headingText = '<a href = "#' + funH5oGenerateId(this.ssElmStart) + '">'
                    + headingText
                    + '</a>';
      return headingText + funH5oGetSectionListAsHtml(this.ssArSections);
    };
  }

  function funH5oGetSectionHeadingRank(semSection) {
    var elmHeading = semSection.ssElmHeading;
    return funH5oIsElmHeading(elmHeading)
          ? funH5oGetHeadingElmRank(elmHeading)
          : 1; /* is this true? TODO: find a reference... */
  }

  /* http://dev.w3.org/html5/spec/Overview.html#outlines */
  function funH5oWalk(elRoot, funH5oEnterNode, funH5oExitNode) {
    var elm = elRoot;
start:
    while (elm) {
      funH5oEnterNode(elm);
      if (elm.firstChild) {
        elm = elm.firstChild;
        continue start;
      }
      while (elm) {
        funH5oExitNode(elm);
        if (elm.nextSibling) {
          elm = elm.nextSibling;
          continue start;
        }
        if (elm === elRoot) {
          elm = null;
        } else {
          elm = elm.parentNode;
        }
      }
    }
  }

  function funH5oGetArrayLastItem(arr) {
    return arr[arr.length - 1];
  }

  function funH5oLastSection(outlineOrSSection) {
    /* from a ssection or elmOutline object */
    if (outlineOrSSection && outlineOrSSection.elStartingNode) {
      return funH5oGetArrayLastItem(outlineOrSSection.elArSections);
    }
    return funH5oGetArrayLastItem(outlineOrSSection.ssArSections);
  }

  function funH5oEnterNode(elm) {
    /* If the top of the stack is a heading-content-element - do nothing */
    if (funH5oIsElmHeading(funH5oGetArrayLastItem(h5oArStack))) {
      return;
    }
    /* When entering a sectioning-content-element or a sectioning-root-element */
    if (funH5oIsElmSectioningContent(elm) || funH5oIsElmSectioningRoot(elm)) {
      /* If current-outlinee is not null, and the current-section has no heading,
       * create an implied heading and let that be the heading
       * for the current-section. */
      // if (h5oElmCurrentOutlinee != null && !h5oSemSectionCurrent.ssElmHeading) {
        /*
          TODO: is this really the way it should be done?
          In my implementation, "implied heading" is always created (section.ssElmHeading = false by default)
          If I DO "create" something else here, the algorithm goes very wrong, as there's a place
          where you have to check whether a "heading exists" - so - does the "implied heading" mean
          there is a heading or not?
        */
      // }
      /* If current-outlinee is not null, push current-outlinee onto the stack. */
      if (h5oElmCurrentOutlinee !== null) {
        h5oArStack.push(h5oElmCurrentOutlinee);
      }
      /* Let current-outlinee be the element that is being entered. */
      h5oElmCurrentOutlinee = elm;
      /* Let current-section be a newly created section for
       * the current-outlinee element. */
      h5oSemSectionCurrent = new FunH5oSemSection(elm);
      /* Let there be a new outline for the new current-outlinee,
       * initialized with just the new current-section as the only
       * section in the outline. */
      h5oElmCurrentOutlinee.elmOutline = {
        elArSections: [h5oSemSectionCurrent],
        elStartingNode: elm,
        elFAsHtml: function () {
          return funH5oGetSectionListAsHtml(this.elArSections);
        }
      };
      return;
    }
    /* If the current-outlinee is null, do nothing */
    if (h5oElmCurrentOutlinee === null) {
      return;
    }
    /* When entering a heading-content-element */
    if (funH5oIsElmHeading(elm)) {
      var h5oSemSectionNew, bAbourtSubsteps, h5oSemSectionCandidate,
        newCandidateSection;
      /* If the current-section has no heading, let the element being entered
       * be the heading for the current-section. */
      if (!h5oSemSectionCurrent.ssElmHeading) {
        h5oSemSectionCurrent.ssElmHeading = elm;
        /* Otherwise, if the element being entered has a rank equal to
         * or greater than the heading of the last section of the outline
         * of the current-outlinee, */
      } else if (funH5oGetHeadingElmRank(elm) >=
          funH5oGetSectionHeadingRank(funH5oLastSection(h5oElmCurrentOutlinee.elmOutline))) {
        /* create a new section and */
        h5oSemSectionNew = new FunH5oSemSection(elm);
        /* append it to the outline of the current-outlinee element,
         * so that this new section is the new last section of that outline. */
        h5oElmCurrentOutlinee.elmOutline.elArSections.push(h5oSemSectionNew);
        /* Let current-section be that new section. */
        h5oSemSectionCurrent = h5oSemSectionNew;
        /* Let the element being entered be the new heading for the current-section. */
        h5oSemSectionCurrent.ssElmHeading = elm;
      /* Otherwise, run these substeps: */
      } else {
        bAbourtSubsteps = false;
        /* 1. Let candidate-section be current-section. */
        h5oSemSectionCandidate = h5oSemSectionCurrent;
        do {
          /* 2. If the element being entered has a rank lower than
           * the rank of the heading of the candidate-section, */
          if (funH5oGetHeadingElmRank(elm) < funH5oGetSectionHeadingRank(h5oSemSectionCandidate)) {
            /* create a new section, */
            h5oSemSectionNew = new FunH5oSemSection(elm);
            /* and append it to candidate-section. (This does not change which section is the last section in the outline.) */
            h5oSemSectionCandidate.ssFAppend(h5oSemSectionNew);
            /* Let current-section be this new section. */
            h5oSemSectionCurrent = h5oSemSectionNew;
            /* Let the element being entered be the new heading
             * for the current-section. */
            h5oSemSectionCurrent.ssElmHeading = elm;
            /* Abort these substeps. */
            bAbourtSubsteps = true;
          }
          /* 3. Let new candidate-section be the section
           * that contains candidate-section in the outline of current-outlinee. */
          newCandidateSection = h5oSemSectionCandidate.container;
          /* 4. Let candidate-section be new candidate-section. */
          h5oSemSectionCandidate = newCandidateSection;
          /* 5. Return to step 2. */
        } while (!bAbourtSubsteps);
      }
      /* Push the element being entered onto the stack.
       * (This causes the algorithm to skip any descendants of the element.) */
      h5oArStack.push(elm);
      return;
    }
    /* Do nothing. */
  }

  function funH5oExitNode(elm) {
    /* If the top of the stack is an element, and you are exiting that element
     *    Note: The element being exited is a heading-content-element.
     *    Pop that element from the stack.
     * If the top of the stack is a heading-content-element - do nothing */
    var stackTop = funH5oGetArrayLastItem(h5oArStack), i;
    if (funH5oIsElmHeading(stackTop)) {
      if (stackTop === elm) {
        h5oArStack.pop();
      }
      return;
    }
    /************ MODIFICATION OF ORIGINAL ALGORITHM *****************/
    /* existing sectioning content or sectioning root
     * this means, h5oSemSectionCurrent will change
     * (and we won't get back to it) */
    if ((funH5oIsElmSectioningContent(elm) || funH5oIsElmSectioningRoot(elm))
           && !h5oSemSectionCurrent.ssElmHeading) {
      h5oSemSectionCurrent.ssElmHeading =
        '<i>Untitled ' + funH5oGetTagName(elm) + '</i>';
    }
    /************ END MODIFICATION ***********************************/
    /* When exiting a sectioning-content-element, if the stack is not empty */
    if (funH5oIsElmSectioningContent(elm) && h5oArStack.length > 0) {
      /* Pop the top element from the stack,
       *and let the current-outlinee be that element. */
      h5oElmCurrentOutlinee = h5oArStack.pop();
      /* Let current-section be the last section
       * in the outline of the current-outlinee element. */
      h5oSemSectionCurrent = funH5oLastSection(h5oElmCurrentOutlinee.elmOutline);
      /* Append the outline of the sectioning-content-element being exited
       * to the current-section.
       * (This does not change which section is the last section in the outline.) */
      for (i = 0; i < elm.elmOutline.elArSections.length; i += 1) {
        h5oSemSectionCurrent.ssFAppend(elm.elmOutline.elArSections[i]);
      }
      return;
    }
    /* When exiting a sectioning-root-element, if the stack is not empty */
    if (funH5oIsElmSectioningRoot(elm) && h5oArStack.length > 0) {
      /* Pop the top element from the stack,
       * and let the current-outlinee be that element. */
      h5oElmCurrentOutlinee = h5oArStack.pop();
      /* Let current-section be the last section
       * in the outline of the current-outlinee element. */
      h5oSemSectionCurrent = funH5oLastSection(h5oElmCurrentOutlinee.elmOutline);
      /* Finding the deepest child:
       * If current-section has no child sections, stop these steps. */
      while (h5oSemSectionCurrent.ssArSections.length > 0) {
        /* Let current-section be the last child section
         * of the current current-section. */
        h5oSemSectionCurrent = funH5oLastSection(h5oSemSectionCurrent);
        /* Go back to the substep labeled finding the deepest child. */
      }
      return;
    }
    /* When exiting a sectioning-content-element or a sectioning-root-element */
    if (funH5oIsElmSectioningContent(elm) || funH5oIsElmSectioningRoot(elm)) {
      /* Let current-section be the first section in the outline of the current-outlinee element. */
      h5oSemSectionCurrent = h5oElmCurrentOutlinee.elmOutline.elArSections[0];
      /* Skip to the next step in the overall set of steps. (The walk is over.) */
      return;
    }
    /* If the current-outlinee is null, do nothing */
    /* Do nothing */
  }

  /* returns the outline-object of an element */
  function funH5oGetOutlineObject(elmStart) {
    h5oNoCounterLink = 0;
    /* we need a document, to be able to use getElementById
     * - @todo: figure out a better way, if there is one */
    h5oElmDocumentRoot = elmStart.ownerDocument || window.document;
    /* @todo: how will this work in, say, Rhino, for outlining fragments?
     * Let current-outlinee be null.
     * (It holds the element whose outline is being created.) */
    h5oElmCurrentOutlinee = null;
    /* Let current-section be null.
     * (It holds a pointer to a section,
     * so that elements in the DOM can all be associated with a section.) */
    h5oSemSectionCurrent = null;
    /* Create a stack to hold elements, which is used to handle nesting.
     * Initialize this stack to empty. */
    h5oArStack = [];
    /* As you walk over the DOM in tree order, trigger the first relevant step
     * below for each element as you enter and exit it. */
    funH5oWalk(elmStart, funH5oEnterNode, funH5oExitNode);
    /* If the current-outlinee is null,
     * then there was no sectioning-content-element or sectioning-root-element
     * in the DOM. There is no outline. Abort these steps. */
    /*
    if (h5oElmCurrentOutlinee != null) {
      Associate any nodes that were not associated with a section
        in the steps above with current-outlinee as their section.
      Associate all nodes with the heading of the section with which
        they are associated, if any.
      If current-outlinee is the body element, then the outline created
        for that element is the outline of the entire document.
    }
    */
    return h5oElmCurrentOutlinee !== null ? h5oElmCurrentOutlinee.elmOutline : null;
  }

  objOutline = funH5oGetOutlineObject(document.body);
  return objOutline ? objOutline.elFAsHtml(true) : "No outline - is there a FRAMESET?";
}

/*
 * Modified from http://www.dhtmlgoodies.com/ */
function fnHitpTreeShow_hide_node(e, inputId) {
  var nodeThis, parentNode;
  if (inputId) {
    if (!document.getElementById(inputId)) {
      return;
    }
    nodeThis = document.getElementById(inputId).getElementsByTagName('span')[0];
  } else {
    nodeThis = this;
    if (this.tagName === 'a') {
      nodeThis = this.parentNode.getElementsByTagName('span')[0];
    }
  }
  parentNode = nodeThis.parentNode;/* ▶▷⊳ ▾▼▽∇ ◇◊*/
  if (nodeThis.innerHTML === '▶') {
    nodeThis.innerHTML = '∇';
    parentNode.getElementsByTagName('ul')[0].style.display = 'block';
  } else if (nodeThis.innerHTML === '∇') {
    nodeThis.innerHTML = '▶';
    parentNode.getElementsByTagName('ul')[0].style.display = 'none';
  }
  return false;
}

/* Makes the display-style: none.
 * Modified from http://www.dhtmlgoodies.com/ */
function fnHitpTreeCollapseAll(idTree) {
  var tocTreeLIs = document.getElementById(idTree).getElementsByTagName('li'),
    no,
    subItems;
  for (no = 0; no < tocTreeLIs.length; no += 1) {
    subItems = tocTreeLIs[no].getElementsByTagName('ul');
    if (subItems.length > 0 && subItems[0].style.display === 'block') {
      fnHitpTreeShow_hide_node(false, tocTreeLIs[no].id);
    }
  }
}

/* Inserts images with onclick events, before a-elements.
 * Sets id on li-elements.
 * Modified from http://www.dhtmlgoodies.com/ */
function fnHitpTreeInit() {
  var tocTree = document.getElementById('idTocTree'),
    tocTreeLIs = tocTree.getElementsByTagName('li'), /* Get an array of all menu items */
    no,
    subItems,
    elmSpan,
    aTag;
  for (no = 0; no < tocTreeLIs.length; no += 1) {
    hitTocNoIdTreeLi += 1;
    subItems = tocTreeLIs[no].getElementsByTagName('ul');
    elmSpan = document.createElement('span');
    elmSpan.innerHTML = '▶';
    elmSpan.onclick = fnHitpTreeShow_hide_node;
    elmSpan.setAttribute('class', 'classSpanListIcon');
    if (subItems.length === 0) {
      elmSpan.innerHTML = '◇';
      elmSpan.removeAttribute('class');
    }
    aTag = tocTreeLIs[no].getElementsByTagName('a')[0];
    tocTreeLIs[no].insertBefore(elmSpan, aTag);
    if (!tocTreeLIs[no].id) {
      tocTreeLIs[no].id = 'idTocTreeLI' + hitTocNoIdTreeLi;
    }
  }
}

/* Highlights ONE item in toc-list */
function fnHitpTreeHighlight_item(elmSpliterLeftDiv, elm) {
  /* removes existing highlighting */
  var tocTreeAs = elmSpliterLeftDiv.getElementsByTagName('a'),
    no;
  for (no = 0; no < tocTreeAs.length; no += 1) {
    tocTreeAs[no].removeAttribute('class');
  }
  elm.setAttribute('class', 'classTocTreeHighlight');
}

/*global $, jQuery*/
jQuery.fn.fnHitpSplit = function () {
  return this.each(function (e) {
    var posSplitCurrent = 222, /* setting */
      posSplitPrevious,
      elmDivSplitter = $(this),
      mychilds = elmDivSplitter.children(),
      elmSpliterLeftDiv = mychilds.first(),
      elmSpliterRightDiv = mychilds.next(),
      elmSpliterBarDiv = $('<div></div>'),
      elmSpliterBarDivGhost,
      elmSpliterBarButonDiv = $('<div></div>');

    $("body").css({
      'width': '100%',
      'height': '100%',
      'padding': '0',
      'margin': '0',
    });
    elmDivSplitter.css({
      'background-color': 'blue',
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'height': '100%',
      'width': '100%',
      'margin': '0',
      'padding': '0',
    });
    elmSpliterLeftDiv.css({
      'background-color': '#ffffff',
      'position': 'absolute',
      'left': '0',
      'height': '100%',
      'margin': '0',
      'overflow': 'auto',
      'font-size': '14px',
    });
    elmSpliterRightDiv.css({
      'background-color': 'white',
      'position': 'fixed',
      'right': '0',
      'height': '100%',
      'overflow': 'auto',
      'padding': '0 5px 0 5px',
      'z-index': '25',
      'outline': 'none',
    });

    function funDragPerform(e) {
      var incr = e.pageX;
      elmSpliterBarDivGhost.css('left', incr);
    }

    /* Perform actual splitting and animate it */
    function funTocSplitTo(pos) {
      pos = parseInt(pos, null);
      posSplitPrevious = posSplitCurrent;
      posSplitCurrent = pos;

      var sizeB = elmDivSplitter.width() - pos - 10 - 10; /* setting splitBar padding */
      elmSpliterLeftDiv.css({'width': pos + 'px'});
      elmSpliterBarDiv.css({'left': pos});
      elmSpliterRightDiv.css({'width': sizeB + 'px', 'left': pos + 10});

      elmDivSplitter.queue(function () {
        setTimeout(function () {
          elmDivSplitter.dequeue();
          mychilds.trigger('resize');
        }, 22);
      });
    }

    function funDragEnd(e) {
      var p = elmSpliterBarDivGhost.position();
      elmSpliterBarDivGhost.remove();
      elmSpliterBarDivGhost = null;
      mychilds.css("-webkit-user-select", "text");
      $(document).unbind("mousemove", funDragPerform)
        .unbind("mouseup", funDragEnd);
      funTocSplitTo(p.left);
    }

    function funDragStart(e) {
      if (e.target !== this) {
        return;
      }
      elmSpliterBarDivGhost = elmSpliterBarDiv.clone(false)
        .insertAfter(elmSpliterLeftDiv);
      elmSpliterBarDivGhost.attr({'id': 'idSpliterBarDivGhost'})
        .css({
          'position': 'absolute',
          'background-color': '#cccccc',
          'z-index': '250',
          '-webkit-user-select': 'none',
          'left': elmSpliterBarDiv.position().left,
        });
      mychilds.css({
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none'
      });
      $(document).bind("mousemove", funDragPerform).bind("mouseup", funDragEnd);
    }

    elmSpliterBarDiv.attr({'id': 'idSpliterBarDiv'})
      .css({
        'background-color': '#999999',
        'cursor': 'e-resize',
        'position': 'absolute',
        'width': '10px',
        'height': '100%',
      })
      .bind("mousedown", funDragStart)
      .hover(
        function () {
          $(this).css({'background-color': '#DDDDDD'});
        },
        function () {
          $(this).css({'background-color': '#999999'});
        }
      );
    elmSpliterBarDiv.insertAfter(elmSpliterLeftDiv);
    elmSpliterBarButonDiv.css({
      'background-color': '#888888',
      'position': 'relative',
      'top': '40%',
      'height': '15%',
      'width': '10px',
      'cursor': 'pointer'
    });
    elmSpliterBarButonDiv.attr({'id': 'idSpliterBarButonDiv'});
    elmSpliterBarDiv.append(elmSpliterBarButonDiv);
    elmSpliterBarButonDiv.mousedown(function (e) {
      if (e.target !== this) {
        return;
      }
      funTocSplitTo((posSplitCurrent === 0) ? posSplitPrevious : 0);
      return false;
    });
    funTocSplitTo(posSplitCurrent);

  });
};

/* Goes to Id, and blinks it. From HTML5-Outliner */
function fnHitpTreeGoto_id(id) {
  var el, currentOpacity, currentTransition, duration, itr, blink;
  location.href = '#' + id;
  el = document.getElementById(id);
  currentOpacity = window.getComputedStyle(el).opacity;
  currentTransition = window.getComputedStyle(el).webkitTransition;
  duration = 200;
  itr = 0;
  el.style.webkitTransitionProperty = 'opacity';
  el.style.webkitTransitionDuration = duration + "ms";
  el.style.webkitTransitionTimingFunction = 'ease';
  blink = function () {
    el.style.opacity = (itr % 2 === 0 ? 0 : currentOpacity);
    if (itr < 3) {
      itr += 1;
      setTimeout(blink, duration);
    } else {
      el.style.webkitTransition = currentTransition;
    }
  };
  blink();
}


/* Makes the display-style: block.
 * Modified from http://www.dhtmlgoodies.com/ */
function fnHitpTreeExpand_all(idTree) {
  var tocTreeLIs = document.getElementById(idTree).getElementsByTagName('li'),
    no,
    subItems;
  for (no = 0; no < tocTreeLIs.length; no += 1) {
    subItems = tocTreeLIs[no].getElementsByTagName('ul');
    if (subItems.length > 0 && subItems[0].style.display !== 'block') {
      fnHitpTreeShow_hide_node(false, tocTreeLIs[no].id);
    }
  }
}

/* Expands the first children. */
function fnHitpTreeExpand_first(idTree) {
  var tocTreeLIs, subItems;
  tocTreeLIs = document.getElementById(idTree).getElementsByTagName('li');
  /* expand the first ul-element */
  subItems = tocTreeLIs[0].getElementsByTagName('ul');
  if (subItems.length > 0 && subItems[0].style.display !== 'block') {
    fnHitpTreeShow_hide_node(false, tocTreeLIs[0].id);
  }
}

/* expands all the parents only, of an element */
function fnHitpTreeExpand_parent(elm) {
  var elmSpan, elmUl;
  /** the parent of a-elm is li-elm with parent a ul-elm. */
  elmUl = elm.parentNode.parentNode;
  while (elmUl.tagName === 'UL') {
    elmUl.style.display = 'block';
    /* the parent is li-elm, its first-child is img */
    elmSpan = elmUl.parentNode.firstChild;
    if (elmSpan.tagName === 'SPAN' && elmSpan.innerHTML === '▶') {
      elmSpan.innerHTML = '∇';
    }
    elmUl = elmUl.parentNode.parentNode;
  }
}

/* this function puts on the page the toc by splitting it. */
function fnHitpMake_toc() {
  /* create toc */
  var contentOriginal = document.body.innerHTML,
    elmBody = document.body,
    elmDivSplitter = document.createElement('div'), /* the general container*/
    elmSpliterRightDiv = document.createElement('div'),
    elmSpliterLeftDiv = document.createElement('div'),
    elmTocBtnCollapse_All = document.createElement('input'),
    elmTocBtnExp_All = document.createElement('input'),
    elmPpath = document.createElement("p"),
    elmPNote = document.createElement("p"),
    elmPopupcontainer = document.createElement('div');

  hitTocNoIdTreeLi = 0;
  elmDivSplitter.id = 'idDivSplitter';
  /* remove from old-body its elements */
  elmBody.innerHTML = '';
  elmBody.appendChild(elmDivSplitter);

  /* set on right-splitter the old-body */
  elmSpliterRightDiv.id = 'idSpliterRightDiv';
  elmSpliterRightDiv.innerHTML = contentOriginal;
  elmDivSplitter.appendChild(elmSpliterRightDiv);

  /* insert toc */
  elmSpliterLeftDiv.id = 'idSpliterLefDiv';
  elmSpliterLeftDiv.innerHTML = funH5oGetOutlineHtml();
  elmSpliterLeftDiv.getElementsByTagName("ul")[0].setAttribute('id', 'idTocTree');
  /* insert collaplse-button */
  elmTocBtnCollapse_All.setAttribute('id', 'idBtnCollapse_All');
  elmTocBtnCollapse_All.setAttribute('type', 'button');
  elmTocBtnCollapse_All.setAttribute('value', '▶');
  elmTocBtnCollapse_All.setAttribute('title', 'Collapse-All');
  elmTocBtnCollapse_All.setAttribute('class', 'classBtn');
  $(elmTocBtnCollapse_All).click(
    function (event) {
      fnHitpTreeCollapseAll('idTocTree');
    }
  );
  elmSpliterLeftDiv.insertBefore(elmTocBtnCollapse_All, elmSpliterLeftDiv.firstChild);
  /* insert expand-button */
  elmTocBtnExp_All.setAttribute('id', 'idBtnExp_All');
  elmTocBtnExp_All.setAttribute('type', 'button');
  elmTocBtnExp_All.setAttribute('value', '∇');
  elmTocBtnExp_All.setAttribute('title', 'Expand-All');
  elmTocBtnExp_All.setAttribute('class', 'classBtn');
  $(elmTocBtnExp_All).click(
    function (event) {
      fnHitpTreeExpand_all('idTocTree');
    }
  );
  elmSpliterLeftDiv.insertBefore(elmTocBtnExp_All, elmSpliterLeftDiv.firstChild);
  /* insert site-structure menu */
  /* insert page-path--element */
  elmPpath.setAttribute('title', "© 2010-2013 Kaseluris.Nikos.1959");
  if (!document.getElementById("idMetaWebpage_path")) {
    elmPpath.innerHTML = 'ToC: ' + document.title;
  } else {
    elmPpath.innerHTML = document.getElementById("idMetaWebpage_path").innerHTML;
  }
  elmSpliterLeftDiv.insertBefore(elmPpath, elmSpliterLeftDiv.firstChild);

  /* toc: add note at the end */
  elmPNote.innerHTML = 'Notes: <br/>a) Clicking on TEXT, you see its position on ToC and its address on address-bar. <br/>b) hovering a domain-link you see a preview.';
  elmSpliterLeftDiv.appendChild(elmPNote);

  $(elmSpliterLeftDiv).find("li > a").each(
    /* what to do on clicking a link in toc */
    function () {
      $(this).click(
        function (event) {
          event.preventDefault();
          var id = $(event.target).attr("href").split('#')[1];
          fnHitpTreeGoto_id(id);
          fnHitpTreeHighlight_item(elmSpliterLeftDiv, this);
          return false;
        }
      );
      /* sets as title-attribute the text of a-element */
      var txt = $(this).text();
      $(this).attr('title', txt);
    }
  );

  /* on content get-id */
  $(elmSpliterRightDiv).find("*[id]").each(
    function () {
      $(this).click(
        function (event) {
          if (event.stopPropagation) {
            event.stopPropagation();
          } else {
            event.cancelBubble = true;
          }

          /* find the id of closest header */
          var sID = false,
            elmSec = $(this);
          /* first go where you click */
          location.href = '#' + $(this).attr('id');

          /* if section exist, then find section's id */
          if ($("section").length > 1) {
            while (!elmSec.get(0).tagName.match(/^SECTION/i)) {
              elmSec = elmSec.parent();
              if (elmSec.get(0).tagName.match(/^HEADER/i)) {
                break;
              }
            }
            if (elmSec.get(0).tagName.match(/^HEADER/i)) {
              sID = '#h5o-1';
            } else {
              sID = '#' + elmSec.attr('id');
            }
            if (sID === "") {
              sID = '#' + $(this).attr('id');
            }
          } else {
            if ($(this).get(0).tagName.match(/^H/)) {
              sID = '#' + $(this).attr('id');
            } else {
              /* no section, then find previous header */
              sID = '#' + $(this).prevAll(":header").attr('id');
            }
          }

          $(elmSpliterLeftDiv).find("a").each(
            function () {
              var position, windowHeight;
              if ($(this).attr('href') === sID) {
                fnHitpTreeCollapseAll('idTocTree');
                fnHitpTreeHighlight_item(elmSpliterLeftDiv, this);
                fnHitpTreeExpand_parent(this);
                /* scroll to this element */
                $(elmSpliterLeftDiv).scrollTop(0);
                position = $(this).offset().top;
                windowHeight = $(window).height();
                $(elmSpliterLeftDiv).scrollTop(position - (windowHeight / 2));
              }
            }
          );
        }
      );
    }
  );
  elmDivSplitter.insertBefore(elmSpliterLeftDiv, elmDivSplitter.firstChild);

  $("#idDivSplitter").fnHitpSplit();

  /* on links with class popupTrigger add this function
   * first insert popup container */
  elmPopupcontainer.id = 'idPopup';
  elmSpliterRightDiv.appendChild(elmPopupcontainer);

  $('a.popupTrigger').mouseover(function (event) {
    var sLoc, sId1, sId2, sPopup, xmlhttp, pv;
    sId1 = this.href;
    if (sId1.indexOf('#') > 0) {
      sId2 = sId1.substring(sId1.indexOf("#") + 1);
      sId1 = sId1.substring(0, sId1.indexOf("#"));
    }
    sLoc = location.href;

    if (sLoc.indexOf('#') > 0) {
      sLoc = sLoc.substring(0, sLoc.indexOf("#"));
    }
    /* internal-link */
    if (sLoc === sId1) {
      sPopup = document.getElementById(sId2).innerHTML;
      /* substring popup-content if it is big text */
      /*jslint regexp: true*/
      if (sPopup.replace(/<[^>]*>?/g, '').length > 1000) {
        sPopup = sPopup.substring(0, 900);
        sPopup = sPopup + '   ... ... ... ... ... ...   ';
      }
      /*jslint regexp: false*/
      $('#idPopup').html(sPopup);
    } else {
      $('#idPopup').html("");
      $('#idPopup').load(sId1 + ' #' + sId2);
    }
    pv = event.pageY;
    if (pv > $(window).height() * 4.5 / 7) {
      pv = $(window).height() / 6;
    } else {
      pv = pv + 26;
    }
    $('#idPopup').css({'top': pv, 'left': $(window).width() / 2.5});
    $('#idPopup').show().appendTo('body');
    /* code for click on popup */
//  });
//  $('#idPopup').click(function () {
//    $('#idPopup').hide();
//  });
  /* next line if you prefer hide popup with finishing hovering */
  }).mouseout(function () {
    $('#idPopup').hide();
  });

  fnHitpTreeInit();
  fnHitpTreeExpand_all('idTocTree');
  fnHitpTreeCollapseAll('idTocTree');
  fnHitpTreeExpand_first('idTocTree');
  /* IF on idMetaWebpage_path paragraph we have and the classTocExpand
   * then the toc expands-all */
  if (document.getElementById("idMetaWebpage_path")) {
    if (document.getElementById("idMetaWebpage_path").getAttribute('class') === 'classTocExpand') {
      fnHitpTreeExpand_all('idTocTree');
    }
  }

  //focus div
  $("#idSpliterRightDiv").attr("tabindex", -1).focus();
}

$(document).ready(function () {
  fnHitpMake_toc();
});
