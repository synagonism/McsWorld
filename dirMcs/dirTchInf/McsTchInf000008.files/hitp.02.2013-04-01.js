/*
 * version.last: 2013.04.01
 * version.this: 2013.04.01
 * version.previous: 2013.03.31
 * version.previous: 2010.12.06
 * toc.js - HTML5-ID-ToC text-format code.
 *
 * Copyright (C) 2010-2013 Kaseluris.Nikos.1959,
 * kaseluris.nikos@gmail.com
 * users.otenet.gr/~nikkas/
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
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
var tocNoIdTreeLi;

/* this function puts on the page the toc by splitting it. */
function funTocMake_toc(){
  /* create toc */
  var contentOriginal=document.body.innerHTML;
  tocNoIdTreeLi=0;
  var elmBody=document.body;

  /* create divSplitter, the general container*/
  var elmDivSplitter=document.createElement("div");
  elmDivSplitter.id="idDivSplitter";
  /* remove from old-body its elements */
  elmBody.innerHTML="";
  elmBody.appendChild(elmDivSplitter);

  /* set on DivCntnt the old-body */
  var elmSpliterRightDiv=document.createElement("div");
  elmSpliterRightDiv.id="idTocSplitRight";
  elmSpliterRightDiv.innerHTML=contentOriginal;
  elmDivSplitter.appendChild(elmSpliterRightDiv);

  /* insert toc */
  var elmSpliterLeftDiv=document.createElement("div");
  elmSpliterLeftDiv.id="idSpliterLefDiv";
  elmSpliterLeftDiv.innerHTML= funH5oGetOutlineHtml();
  elmSpliterLeftDiv.getElementsByTagName("ul")[0].setAttribute('id','idTocTree');
  /* insert collaplse-button */
  var elmTocBtnCollapse_All=document.createElement("input");
  elmTocBtnCollapse_All.setAttribute("type","button");
  elmTocBtnCollapse_All.setAttribute("value","Collapse-All");
  $(elmTocBtnCollapse_All).click(
    function(event){
      funTocTreeCollapseAll('idTocTree');
    });
  elmSpliterLeftDiv.insertBefore(elmTocBtnCollapse_All,elmSpliterLeftDiv.firstChild);
  /* insert expand-button */
  var elmTocBtnExp_All=document.createElement("input");
  elmTocBtnExp_All.setAttribute("type","button");
  elmTocBtnExp_All.setAttribute("value","Expand-All");
  $(elmTocBtnExp_All).click(
    function(event){
      funTocTreeExpandAll('idTocTree');
    });
  elmSpliterLeftDiv.insertBefore(elmTocBtnExp_All,elmSpliterLeftDiv.firstChild);
  /* insert page-path--element */
  var elmPpath=document.createElement("p");
  if(!document.getElementById("idWebpage_path")){
    elmPpath.innerHTML="ToC: "+document.title;
  }else{
    elmPpath.innerHTML=document.getElementById("idWebpage_path").innerHTML;
  }
  elmPpath.title="© 2010-2013 Kaseluris.Nikos.1959";
  elmSpliterLeftDiv.insertBefore(elmPpath,elmSpliterLeftDiv.firstChild);

  /* toc: add note at the end */
  var elmPNote=document.createElement("p");
  elmPNote.innerHTML="Note: Clicking on TEXT, you see on the expandable-toc-tree its position.";
  elmSpliterLeftDiv.appendChild(elmPNote);

  $(elmSpliterLeftDiv).find("a").each(
    /* what to do on clicking a link in toc */
    function(){
      $(this).click(
        function(event){
          event.preventDefault();
          var id=$(event.target).attr("href").split('#')[1];
          funTocTreeGotoId(id);
          funTocTreeHighlightItem(elmSpliterLeftDiv,this);
          return false
        }
      )
      /* sets as title-attribute the text of a-element */
      var txt=$(this).text();
      $(this).attr('title',txt);
    }
  );

  /* on content get-id */
  $(elmSpliterRightDiv).find("*[id]").each(
    function(){
      $(this).click(
        function(event){
          if (event.stopPropagation){
            event.stopPropagation();
          }else{
            event.cancelBubble=true;
          }

//                var sID="#"+$(this).attr('id');
          //find the id of closest header
          var sID = "";
          if ($(this).get(0).tagName.match(/^H/)) {
            sID = "#" + $(this).attr('id');
          } else {
            sID = "#" + $(this).siblings(":header:last").attr('id');
            if (sID === "") {
              sID = "#" + $(this).attr('id');
            }
          }

          $(elmSpliterLeftDiv).find("a").each(
            function(){
              if($(this).attr('href')===sID){
//                      funTocTreeExpandAll('idTocTree');
                funTocTreeCollapseAll('idTocTree');
                funTocTreeHighlightItem(elmSpliterLeftDiv,this);
                funTocTreeExpandParent(this);
                /* scroll to this element */
//                      this.scrollIntoView(true);
              }
            }
          );
        }
      )
    }
  );
  elmDivSplitter.insertBefore(elmSpliterLeftDiv,elmDivSplitter.firstChild);

  $("#idDivSplitter").funTocSplit();

  funTocTreeInit();
  funTocTreeExpandAll('idTocTree');
  funTocTreeCollapseAll('idTocTree');
  funTocTreeExpandFirst('idTocTree');
  /* go to existing-address */
  var sUrl=document.URL;
  if(sUrl.indexOf("#")>=0){
    location.href="#"+sUrl.split('#')[1];
  }
}


/* Returns an html-ul-element that holds the outline.
 * <ul id="idTocTree">
 *   <li id="idTocTreeLI1"><img src="...png"><a href="#h5o-1" title="...">...</a>
 *   ...
 *   </li>
 * </ul>
 * From HTML5-Outliner: https://chrome.google.com/extensions/detail/afoibpobokebhgfnknfndkgemglggomo */
function funH5oGetOutlineHtml(){
  var h5oElmCurrentOutlinee, h5oElmDocumentRoot, h5oSemSectionCurrent,
      h5oArStack, h5oNoCounterLink;

  /* http://dev.w3.org/html5/spec/Overview.html#sectioning-root */
  function funH5oIsElmSectioningRoot(elm){
    return funH5oIsElement(elm) &&
           (new RegExp('^BLOCKQUOTE|BODY|DETAILS|FIELDSET|FIGURE|TD$', "i")).test(funH5oGetTagName(elm));
  }

  /* http://dev.w3.org/html5/spec/Overview.html#sectioning-content */
  function funH5oIsElmSectioningContent(elm){
    return funH5oIsElement(elm) &&
            (new RegExp('^ARTICLE|ASIDE|NAV|SECTION$', "i")).test(funH5oGetTagName(elm));
  }

  /* http://dev.w3.org/html5/spec/Overview.html#heading-content */
  function funH5oIsElmHeading(elm){
    return funH5oIsElement(elm) &&
            (new RegExp('^H[1-6]|HGROUP$', "i")).test(funH5oGetTagName(elm));
  }

  function funH5oIsElement(obj){
    return obj && obj.tagName;
  }

  /* A semantic-section (ss) class */
  function funH5oSemSection(elmStart){
    this.ssArSections=[];
    this.ssElmStart=elmStart;
    /* the heading-element of this semantic-section */
    this.ssElmHeading=false;

    this.ssFAppend=function(what){
      what.container=this;
      this.ssArSections.push(what);
    };
    this.ssFAsHTML= function(){
      var headingText=funH5oGetSectionHeadingText(this.ssElmHeading);
      headingText='<a href="#'+funH5oGenerateId(this.ssElmStart)+'">'
                    + headingText
                    + '</a>';
      return headingText + funH5oGetSectionListAsHtml(this.ssArSections);
    };
  }

  function funH5oGetSectionListAsHtml(sections){
    var retval='';
    for (var i=0; i < sections.length; i++) {
      retval+='<li>'+sections[i].ssFAsHTML()+'</li>';
    }
    return (retval=='' ? retval : '<ul>'+retval+'</ul>');
  }

  function funH5oGetSectionHeadingRank(semSection){
    var elmHeading=semSection.ssElmHeading;
    return funH5oIsElmHeading(elmHeading)
          ? funH5oGetHeadingElmRank(elmHeading)
          : 1; /* is this true? TODO: find a reference... */
  }

  /* returns the text of heading of a sem-section */
  function funH5oGetSectionHeadingText(elmHeading){
    if (funH5oIsElmHeading(elmHeading)) {
      if (funH5oGetTagName(elmHeading)=='HGROUP') {
        elmHeading=elmHeading.getElementsByTagName('h'+(-funH5oGetHeadingElmRank(elmHeading)))[0];
      }
      /* @todo: try to resolve text content from img[alt] or *[title] */
      var sTxt=elmHeading.textContent;
      /* removes from heading the "classHide" content */
      sTxt=sTxt.replace(/\n *¶$/, "");
      return sTxt
        || elmHeading.innerText
        || "<i>No text content inside "+elmHeading.nodeName+"</i>";
    }
    return ""+elmHeading;
  }

  /* sets an id in an element, if it does not has one */
  function funH5oGenerateId(elm){
    var id=elm.getAttribute('id');
    if (id) return id;

    /* toc-extension has 2 div-elm, one for toc and one to content.
     * this way the begining of content is NOT the body-element.
     * Thus I put the first id, in its first heading-element. */
    if (funH5oGetTagName(elm)=='BODY'){
      id="h5o-1";
      if(elm.getElementsByTagName("header").length>0){
        elm.getElementsByTagName("header")[0].setAttribute('id',id);
      }else if(elm.getElementsByTagName("h1").length>0){
        elm.getElementsByTagName("h1")[0].setAttribute('id',id);
      }else if(elm.getElementsByTagName("h2").length>0){
        elm.getElementsByTagName("h2")[0].setAttribute('id',id);
      }
      return id;
    }

    do {
      id='h5o-'+(++h5oNoCounterLink);
    } while (h5oElmDocumentRoot.getElementById(id));
    elm.setAttribute('id', id);
    return id;
  }

  /* http://dev.w3.org/html5/spec/Overview.html#outlines */
  function funH5oWalk(elRoot, funH5oEnterNode, funH5oExitNode) {
    var elm=elRoot;
    start: while (elm) {
      funH5oEnterNode(elm);
      if (elm.firstChild) {
        elm=elm.firstChild;
        continue start;
      }
      while (elm) {
        funH5oExitNode(elm);
        if (elm.nextSibling) {
          elm=elm.nextSibling;
          continue start;
        }
        if (elm == elRoot)
          elm=null;
        else
          elm=elm.parentNode;
      }
    }
  }

  function funH5oEnterNode(elm){
    /* If the top of the stack is a heading-content-element - do nothing */
    if (funH5oIsElmHeading(funH5oGetArrayLastItem(h5oArStack))) {
      return;
    }
    /* When entering a sectioning-content-element or a sectioning-root-element */
    if (funH5oIsElmSectioningContent(elm) || funH5oIsElmSectioningRoot(elm)) {
      /* If current-outlinee is not null, and the current-section has no heading,
       * create an implied heading and let that be the heading
       * for the current-section. */
      // if (h5oElmCurrentOutlinee!=null && !h5oSemSectionCurrent.ssElmHeading) {
        /*
          TODO: is this really the way it should be done?
          In my implementation, "implied heading" is always created (section.ssElmHeading=false by default)
          If I DO "create" something else here, the algorithm goes very wrong, as there's a place
          where you have to check whether a "heading exists" - so - does the "implied heading" mean
          there is a heading or not?
        */
      // }
      /* If current-outlinee is not null, push current-outlinee onto the stack. */
      if (h5oElmCurrentOutlinee!=null) {
        h5oArStack.push(h5oElmCurrentOutlinee);
      }
      /* Let current-outlinee be the element that is being entered. */
      h5oElmCurrentOutlinee=elm;
      /* Let current-section be a newly created section for
       * the current-outlinee element. */
      h5oSemSectionCurrent=new funH5oSemSection(elm);
      /* Let there be a new outline for the new current-outlinee,
       * initialized with just the new current-section as the only
       * section in the outline. */
      h5oElmCurrentOutlinee.elmOutline={
        elArSections: [h5oSemSectionCurrent],
        elStartingNode: elm,
        elFAsHtml: function() {
          return funH5oGetSectionListAsHtml(this.elArSections);
        }
      }
      return;
    }
    /* If the current-outlinee is null, do nothing */
    if (h5oElmCurrentOutlinee==null) {
      return;
    }
    /* When entering a heading-content-element */
    if (funH5oIsElmHeading(elm)) {
      /* If the current-section has no heading, let the element being entered
       * be the heading for the current-section. */
      if (!h5oSemSectionCurrent.ssElmHeading) {
        h5oSemSectionCurrent.ssElmHeading=elm;
        /* Otherwise, if the element being entered has a rank equal to
         * or greater than the heading of the last section of the outline
         * of the current-outlinee, */
      } else if (funH5oGetHeadingElmRank(elm) >=
                 funH5oGetSectionHeadingRank(
                   funH5oLastSection(h5oElmCurrentOutlinee.elmOutline))) {
        /* create a new section and */
        var h5oSemSectionNew=new funH5oSemSection(elm);
        /* append it to the outline of the current-outlinee element,
         * so that this new section is the new last section of that outline. */
        h5oElmCurrentOutlinee.elmOutline.elArSections.push(h5oSemSectionNew);
        /* Let current-section be that new section. */
        h5oSemSectionCurrent=h5oSemSectionNew;
        /* Let the element being entered be the new heading for the current-section. */
        h5oSemSectionCurrent.ssElmHeading=elm;
      /* Otherwise, run these substeps: */
      } else {
        var bAbourtSubsteps=false;
        /* 1. Let candidate-section be current-section. */
        var h5oSemSectionCandidate=h5oSemSectionCurrent;
        do {
          /* 2. If the element being entered has a rank lower than
           * the rank of the heading of the candidate-section, */
          if (funH5oGetHeadingElmRank(elm) < funH5oGetSectionHeadingRank(h5oSemSectionCandidate)) {
            /* create a new section, */
            var h5oSemSectionNew=new funH5oSemSection(elm);
            /* and append it to candidate-section. (This does not change which section is the last section in the outline.) */
            h5oSemSectionCandidate.ssFAppend(h5oSemSectionNew);
            /* Let current-section be this new section. */
            h5oSemSectionCurrent=h5oSemSectionNew;
            /* Let the element being entered be the new heading
             * for the current-section. */
            h5oSemSectionCurrent.ssElmHeading=elm;
            /* Abort these substeps. */
            bAbourtSubsteps=true;
          }
          /* 3. Let new candidate-section be the section
           * that contains candidate-section in the outline of current-outlinee. */
          var newCandidateSection=h5oSemSectionCandidate.container;
          /* 4. Let candidate-section be new candidate-section. */
          h5oSemSectionCandidate=newCandidateSection;
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

  function funH5oExitNode(elm){
    /* If the top of the stack is an element, and you are exiting that element
     *    Note: The element being exited is a heading-content-element.
     *    Pop that element from the stack.
     * If the top of the stack is a heading-content-element - do nothing */
    var stackTop=funH5oGetArrayLastItem(h5oArStack);
    if (funH5oIsElmHeading(stackTop)) {
      if (stackTop == elm) {
        h5oArStack.pop();
      }
      return;
    }
    /************ MODIFICATION OF ORIGINAL ALGORITHM *****************/
    /* existing sectioning content or sectioning root
     * this means, h5oSemSectionCurrent will change
     * (and we won't get back to it) */
    if ((funH5oIsElmSectioningContent(elm)|| funH5oIsElmSectioningRoot(elm))
           && !h5oSemSectionCurrent.ssElmHeading) {
      h5oSemSectionCurrent.ssElmHeading=
        '<i>Untitled ' + funH5oGetTagName(elm) + '</i>';
    }
    /************ END MODIFICATION ***********************************/
    /* When exiting a sectioning-content-element, if the stack is not empty */
    if (funH5oIsElmSectioningContent(elm) && h5oArStack.length > 0) {
      /* Pop the top element from the stack,
       *and let the current-outlinee be that element. */
      h5oElmCurrentOutlinee=h5oArStack.pop();
      /* Let current-section be the last section
       * in the outline of the current-outlinee element. */
      h5oSemSectionCurrent=funH5oLastSection(h5oElmCurrentOutlinee.elmOutline);
      /* Append the outline of the sectioning-content-element being exited
       * to the current-section.
       * (This does not change which section is the last section in the outline.) */
      for (var i=0; i < elm.elmOutline.elArSections.length; i++) {
        h5oSemSectionCurrent.ssFAppend(elm.elmOutline.elArSections[i]);
      }
      return;
    }
    /* When exiting a sectioning-root-element, if the stack is not empty */
    if (funH5oIsElmSectioningRoot(elm) && h5oArStack.length > 0) {
      /* Pop the top element from the stack,
       * and let the current-outlinee be that element. */
      h5oElmCurrentOutlinee=h5oArStack.pop();
      /* Let current-section be the last section
       * in the outline of the current-outlinee element. */
      h5oSemSectionCurrent=funH5oLastSection(h5oElmCurrentOutlinee.elmOutline);
      /* Finding the deepest child:
       * If current-section has no child sections, stop these steps. */
      while (h5oSemSectionCurrent.ssArSections.length > 0) {
        /* Let current-section be the last child section
         * of the current current-section. */
        h5oSemSectionCurrent=funH5oLastSection(h5oSemSectionCurrent);
        /* Go back to the substep labeled finding the deepest child. */
      }
      return;
    }
    /* When exiting a sectioning-content-element or a sectioning-root-element */
    if (funH5oIsElmSectioningContent(elm) || funH5oIsElmSectioningRoot(elm)) {
      /* Let current-section be the first section in the outline of the current-outlinee element. */
      h5oSemSectionCurrent=h5oElmCurrentOutlinee.elmOutline.elArSections[0];
      /* Skip to the next step in the overall set of steps. (The walk is over.) */
      return;
    }
    /* If the current-outlinee is null, do nothing */
    /* Do nothing */
  }

  /* minifiers will love this more than using el.tagName.toUpperCase() directly */
  function funH5oGetTagName(elm){
    return elm.tagName.toUpperCase();
    /* upper casing due to http://ejohn.org/blog/nodename-case-sensitivity/ */
  }

  function funH5oGetHeadingElmRank(el){
    var elTagName=funH5oGetTagName(el);
    if (elTagName=='HGROUP') {
      /* The rank of an hgroup element is the rank of the highest-ranked
       * h1-h6 element descendant of the hgroup element,
       * if there are any such elements, or otherwise the same as for
       * an h1 element (the highest rank). */
      for (var i=1; i <= 6; i++) {
        if (el.getElementsByTagName('H'+i).length > 0)
          return -i;
      }
    } else {
      return -parseInt(elTagName.substr(1));
    }
  }

  function funH5oLastSection(outlineOrSSection){
    /* from a ssection or elmOutline object */
    if (outlineOrSSection && outlineOrSSection.elStartingNode){
      return funH5oGetArrayLastItem(outlineOrSSection.elArSections);
    }else{
      return funH5oGetArrayLastItem(outlineOrSSection.ssArSections);
    }
  }

  function funH5oGetArrayLastItem(arr){
    return arr[arr.length-1];
  }

  /* returns the outline-object of an element */
  function funH5oGetOutlineObject(elmStart){
    h5oNoCounterLink=0;
    /* we need a document, to be able to use getElementById
     * - @todo: figure out a better way, if there is one */
    h5oElmDocumentRoot=elmStart.ownerDocument || window.document;
    /* @todo: how will this work in, say, Rhino, for outlining fragments?
     * Let current-outlinee be null.
     * (It holds the element whose outline is being created.) */
    h5oElmCurrentOutlinee=null;
    /* Let current-section be null.
     * (It holds a pointer to a section,
     * so that elements in the DOM can all be associated with a section.) */
    h5oSemSectionCurrent=null;
    /* Create a stack to hold elements, which is used to handle nesting.
     * Initialize this stack to empty. */
    h5oArStack=[];
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
    return h5oElmCurrentOutlinee != null ? h5oElmCurrentOutlinee.elmOutline : null;
  }

  var objOutline=funH5oGetOutlineObject(document.body);
  return objOutline ? objOutline.elFAsHtml(true) : "No outline - is there a FRAMESET?";
}

/* Goes to Id, and blinks it. From HTML5-Outliner */
function funTocTreeGotoId(id){
  location.href='#'+id;
  var el=document.getElementById(id);
  var currentOpacity=window.getComputedStyle(el).opacity,
    currentTransition=window.getComputedStyle(el).webkitTransition;
  var duration=200,
    itr=0;
  el.style.webkitTransitionProperty="opacity";
  el.style.webkitTransitionDuration=duration+"ms"
  el.style.webkitTransitionTimingFunction="ease";
  var blink=function()
  {
    el.style.opacity=(itr % 2 == 0 ? 0 : currentOpacity);
    if (itr < 3) {
      itr++;
      setTimeout(blink, duration);
    } else {
      el.style.webkitTransition=currentTransition;
    }
  }
  blink();
}


/* Makes the display-style: block.
 * Modified from http://www.dhtmlgoodies.com/ */
function funTocTreeExpandAll(idTree){
  var tocTreeLIs=document.getElementById(idTree).getElementsByTagName('li');
  for(var no=0;no<tocTreeLIs.length;no++){
    var subItems=tocTreeLIs[no].getElementsByTagName('ul');
    if(subItems.length>0 && subItems[0].style.display!='block'){
      funTocTreeShowHideNode(false,tocTreeLIs[no].id);
    }
  }
}

/* Expands the first children. */
function funTocTreeExpandFirst(idTree){
  var tocTreeLIs=document.getElementById(idTree).getElementsByTagName('li');
  /* expand the first ul-element */
  var subItems=tocTreeLIs[0].getElementsByTagName('ul');
  if(subItems.length>0 && subItems[0].style.display!='block'){
    funTocTreeShowHideNode(false,tocTreeLIs[0].id);
  }
}

/* expands all the parents only, of an element */
function funTocTreeExpandParent(elm){
  var elmSpan;
  /** the parent of a-elm is li-elm with parent a ul-elm. */
  var elmUl=elm.parentNode.parentNode;
  while (elmUl.tagName==="UL"){
    elmUl.style.display='block';
    /* the parent is li-elm, its first-child is img */
    elmSpan=elmUl.parentNode.firstChild;
//    if(elmSpan.tagName==="SPAN" && elmSpan.src.indexOf(imgTocPlus)>=0){
    if(elmSpan.tagName==="SPAN" && elmSpan.innerHTML==="►"){
//      elmSpan.src=elmSpan.src.replace(imgTocPlus,imgTocMinus);
      elmSpan.innerHTML="▼";
    }
    elmUl=elmUl.parentNode.parentNode;
  }

}

/* Makes the display-style: none.
 * Modified from http://www.dhtmlgoodies.com/ */
function funTocTreeCollapseAll(idTree){
  var tocTreeLIs=document.getElementById(idTree).getElementsByTagName('li');
  for(var no=0;no<tocTreeLIs.length;no++){
    var subItems=tocTreeLIs[no].getElementsByTagName('ul');
    if(subItems.length>0 && subItems[0].style.display=='block'){
      funTocTreeShowHideNode(false,tocTreeLIs[no].id);
    }
  }
}

/*
 * Modified from http://www.dhtmlgoodies.com/ */
function funTocTreeShowHideNode(e,inputId)
{
  var nodeThis;
  if(inputId){
    if(!document.getElementById(inputId))
      return;
    nodeThis=document.getElementById(inputId).getElementsByTagName('span')[0];
  }else{
    nodeThis=this;
    if(this.tagName=='a')
      nodeThis=this.parentNode.getElementsByTagName('span')[0];
  }
  var parentNode=nodeThis.parentNode;
  if(nodeThis.innerHTML==="►"){
    nodeThis.innerHTML="▼";
    parentNode.getElementsByTagName('ul')[0].style.display='block';
  }else if(nodeThis.innerHTML==="▼"){
    nodeThis.innerHTML="►";
    parentNode.getElementsByTagName('ul')[0].style.display='none';
  }
  return false;
}

/* Inserts images with onclick events, before a-elements.
 * Sets id on li-elements.
 * Modified from http://www.dhtmlgoodies.com/ */
function funTocTreeInit(){
  var tocTree=document.getElementById('idTocTree');
  var tocTreeLIs=tocTree.getElementsByTagName('li'); // Get an array of all menu items
  for(var no=0;no<tocTreeLIs.length;no++){
    tocNoIdTreeLi++;
    var subItems=tocTreeLIs[no].getElementsByTagName('ul');
    var elmSpan=document.createElement('span');
    elmSpan.innerHTML="►";
    elmSpan.onclick=funTocTreeShowHideNode;
    elmSpan.setAttribute('class','classSpanListIcon');
    if(subItems.length==0){
      elmSpan.innerHTML="◇";
      elmSpan.removeAttribute("class");
    }
    var aTag=tocTreeLIs[no].getElementsByTagName('a')[0];
    tocTreeLIs[no].insertBefore(elmSpan,aTag);
    if(!tocTreeLIs[no].id)
      tocTreeLIs[no].id='idTocTreeLI' + tocNoIdTreeLi;
  }
}

/* Highlights ONE item in toc-list */
function funTocTreeHighlightItem(elmSpliterLeftDiv,elm){
  /* removes existing highlighting */
  var tocTreeAs=elmSpliterLeftDiv.getElementsByTagName('a');
  for(var no=0;no<tocTreeAs.length;no++){
    tocTreeAs[no].removeAttribute("class");
  }
  elm.setAttribute('class','classTocTreeHighlight');
}


jQuery.fn.funTocSplit = function(){
  return this.each(function() {
    var posSplitCurrent = 222; //setting
    var posSplitPrevious;
    var elmDivSplitter = $(this);
    var mychilds = elmDivSplitter.children();
    var elmSpliterLeftDiv = mychilds.first();
    var elmSpliterRightDiv = mychilds.next();
    var elmSpliterBarDiv = $('<div></div>');
    var elmSpliterBarDivGhost;
    var elmSpliterBarButonDiv = $('<div></div>');

    $("body").css({
      "width": "100%",
      "height": "100%",
      "padding": "0",
      "margin": 0,});
    elmDivSplitter.css({"background-color": "blue",
      "position": "absolute",
      "top": "0",
      "left": "0",
      "height": "100%",
      "width": "100%",
      "margin": "0",
      "padding": "0",});
    elmSpliterLeftDiv.css({"background-color": "#ffffff",
      "position": "absolute",
      "left": "0",
      "height": "100%",
      "margin": "0",
      "overflow": "auto",
      "font-size": "14px",});
    elmSpliterRightDiv.css({"background-color": "white",
      "position": "absolute",
      "right": "0",
      "height": "100%",
      "overflow": "auto",
      "padding": "0 5px 0 5px",
      "z-index": "10",});
    elmSpliterBarDiv.attr({"id": "idSpliterBarDiv"})
      .css({"background-color": "#999999",
            "cursor": "e-resize",
            "position": "absolute",
            "width": "10px",
            "height": "100%",})
      .bind("mousedown", funDragStart)
      .hover(
        function () {
          $(this).css({'background-color': '#DDDDDD'});
        },
        function () {
          $(this).css({'background-color': '#999999'});
        });
    elmSpliterBarDiv.insertAfter(elmSpliterLeftDiv);
    elmSpliterBarButonDiv.css({"background-color": "#888888",
        "position": "relative",
        "top": "40%",
        "height": "15%",
        "width": "10px",
        "cursor":"pointer"});
    elmSpliterBarButonDiv.attr({"id": "idSpliterBarButonDiv"});
    elmSpliterBarDiv.append(elmSpliterBarButonDiv);
    elmSpliterBarButonDiv.mousedown(function(e){
      if(e.target != this)return;
      funTocSplitTo((posSplitCurrent==0)? posSplitPrevious : 0);
      return false;
    });
    funTocSplitTo(posSplitCurrent);
    $(window).bind("resize",function(){
      funTocSplitTo(posSplitCurrent);
    });

    function funDragStart(e) {
      if(e.target != this)return;
      elmSpliterBarDivGhost = elmSpliterBarDiv.clone(false)
        .insertAfter(elmSpliterLeftDiv);
      elmSpliterBarDivGhost.css({
          'position':'absolute',
          'background-color': '#DDDDDD',
          'z-index':'250',
          '-webkit-user-select':'none',
          'left':elmSpliterBarDiv.position()["left"],
        });
      mychilds.css({
          "-webkit-user-select": "none",
          "-khtml-user-select": "none",
          "-moz-user-select": "none"});
      $(document).bind("mousemove", funDragPerform).bind("mouseup", funDragEnd);
    }

    function funDragPerform(e) {
      var incr = e["pageX"];
      elmSpliterBarDivGhost.css("left", incr);
    }

    function funDragEnd(e){
      var p=elmSpliterBarDivGhost.position();
      elmSpliterBarDivGhost.remove();
      elmSpliterBarDivGhost = null;
      mychilds.css("-webkit-user-select", "text");
      $(document).unbind("mousemove", funDragPerform)
        .unbind("mouseup", funDragEnd);
      funTocSplitTo(p["left"]);
    }

    //Perform actual splitting and animate it;
    function funTocSplitTo(pos) {
      pos = parseInt(pos);
      posSplitPrevious=posSplitCurrent;
      posSplitCurrent=pos;

      var sizeB = elmDivSplitter.width() - pos - 10 - 10; //setting splitBar padding
      elmSpliterLeftDiv.css({"width":pos+'px'});
      elmSpliterBarDiv.css({"left":pos});
      elmSpliterRightDiv.css({"width":sizeB+'px',"left":pos+10});

      elmDivSplitter.queue(function(){
        setTimeout(function(){
          elmDivSplitter.dequeue();
          mychilds.trigger("resize");
        }, 22);
      });
    }
  });
}