/*
 * mLagElln.js - module of Greek-language.
 * The MIT License (MIT)
 *
 * Copyright (c) 2022 Kaseluris.Nikos.1959 (synagonism)
 * kaseluris.nikos@gmail.com
 * https:// synagonism.net/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import moFs from 'fs'
import * as moLagUtil from './mLagUtil.js'
import fetch from 'node-fetch'

const
  // contains the-versions of mLagElln.js
  aVersion = [
    'mLagElln.js.0-1-0.2022-01-15: creation'
  ],
  sFileElln = 'dirLag/McsLag000020.last.html'

let
  aVerbEllnRegularNo = [],
  sMembers,
  oReadlines,
  oNextln,
  sLn

function fFindVerbEllnRegularNo () {
  oReadlines = new mfReadlines(sFileElln)
  while (oNextln = oReadlines.next()) {
    sLn = oNextln.toString()
    /*
    oOl = oDoc.getElementById('idLEnglvrbC1Spcdsn')
    for (let n = 0; n < aLi.length; n++) {
      let s = aLi[n].innerHTML
      if (s.indexOf('<strong>') >= 0)
        aVerbEllnRegularNo.push(s.substring(8, s.lastIndexOf('<')))
      else
        aVerbEllnRegularNo.push(s.substring(0, s.lastIndexOf(',')))
    }
    */
  }
}
//fFindVerbEllnRegularNo()

/**
 * DOING: it finds the-members of a-Greek-case.
 *
function fFindCasembrElln (sBaseIn, sMethodIn) {
  sMembers = ''

  //ΑΡΣΕΝΙΚΑ
    if (subtype.equalsIgnoreCase("eln1a1")) {
      if (greekTonosFind(fform)==1) {
          //ο σφουγγαράς,σφουγγαρά,σφουγγαράδες,σφουγγαράδων
          note="Κλίθηκε με τον eln1a1(ο σφουγγαράς): αρσενικό -ας οξύτονο.";
          stem=getFirstLettersIfSuffix(fform, 2);
          forms=  "ο "
                +stem +"άς,"
                +stem +"ά,"
                +stem +"ά,"
                +stem +"ά,"
                +stem +"άδες,"
                +stem +"άδων,"
                +stem +"άδες,"
                +stem +"άδες";
      }
      else if (greekTonosFind(fform)==2) {
          //ο αγώνας,αγώνα,αγώνες,αγώνων
          //ΕΞΑΙΡΕΣΗ: τα δισύλαβα και αυτά που τελειώνουν σε -ίας,
          //          τονίζουν τη γεν-πληθ στη λήγουσα.
          //          ταμίας,ταμία,ταμίες,ταμιών
          //          μήνας,μήνα,μήνες,μηνών.
          stem=getFirstLettersIfSuffix(fform, 2);
          stem2=greekTonosRemove(stem);
          if (   greekVowel_NumberFind(fform)==2
              || fform.endsWith("ίας") ) {
            note="Κλίθηκε με τον eln1a1(ο ταμίας): αρσενικό -ας παροξύτονο δισύλλαβο σε -ίας.";
            forms=  "ο "
                +stem +"ας,"
                +stem +"α,"
                +stem +"α,"
                +stem +"α,"
                +stem +"ες,"
                +stem2 +"ών,"
                +stem +"ες,"
                +stem +"ες";
          }
          else {
            note="Κλίθηκε με τον eln1a1(ο αγώνας): αρσενικό -ας παροξύτονο.";
            forms=  "ο "
                +stem +"ας,"
                +stem +"α,"
                +stem +"α,"
                +stem +"α,"
                +stem +"ες,"
                +stem +"ων,"
                +stem +"ες,"
                +stem +"ες";
          }
      }
      else if (greekTonosFind(fform)==3) {
        //μάστορας στον πληθυντικό κυρίως μαστόροι,μαστόρων, μαστόρους όπως (άγγελος) 2001.04.13
          //ο φύλακας,φύλακα,φύλακες,φυλάκων
          stem=getFirstLettersIfSuffix(fform, 2);
          stem2=greekTonosIncrease(stem);
          note="Κλίθηκε με τον eln1a1(ο φύλακας): αρσενικό -ας προπαροξύτονο.";
          forms=  "ο "
                +stem +"ας,"
                +stem +"α,"
                +stem +"α,"
                +stem +"α,"
                +stem +"ες,"
                +stem2 +"ων,"
                +stem +"ες,"
                +stem +"ες";
      }
    }

    //αρσενικά σε -ες
    else if (subtype.equalsIgnoreCase("eln1b1")) {
        //ο καφές,καφέ,καφέδες,καφέδων
        stem=getFirstLettersIfSuffix(fform, 2);
        note="Κλίθηκε με τον eln1b1(ο καφές): αρσενικό -ες.";
        forms=  "ο "
              +stem +"ές,"
              +stem +"έ,"
              +stem +"έ,"
              +stem +"έ,"
              +stem +"έδες,"
              +stem +"έδων,"
              +stem +"έδες,"
              +stem +"έδες";
    }

    else if (subtype.equalsIgnoreCase("eln1c1")) {
          //ισοσύλλαβα
          if (greekTonosFind(fform)==1) {
            //ο νικητής,νικητή,νικητές,νικητών
            stem=getFirstLettersIfSuffix(fform, 2);
            note="Κλίθηκε με τον eln1c1(ο νικητής): αρσενικό -ης οξύτονο.";
            forms=  "ο "
              +stem +"ής,"
              +stem +"ή,"
              +stem +"ή,"
              +stem +"ή,"
              +stem +"ές,"
              +stem +"ών,"
              +stem +"ές,"
              +stem +"ές";
          }
          else if (greekTonosFind(fform)==2) {
            //ο ναύτης,ναύτη,ναύτες,ναυτών.
            stem=getFirstLettersIfSuffix(fform, 2);
            note="Κλίθηκε με τον eln1c1(ο ναύτης): αρσενικό -ης παροξύτονο.";
            forms=  "ο "
              +stem +"ης,"
              +stem +"η,"
              +stem +"η,"
              +stem +"η,"
              +stem +"ες,"
              +greekTonosRemove(stem) +"ών,"
              +stem +"ες,"
              +stem +"ες";
          }
    }
    else if (subtype.equalsIgnoreCase("eln1c1b")) {
            //ισοσύλλαβα
            //ο σταχτής
            stem=getFirstLettersIfSuffix(fform, 2);
            note="Κλίθηκε με τον eln1c1b(ο σταχτής): ΕΠΙΘΕΤΟ αρσενικό -ής οξύτονο.";
            forms=  "ο "
              +stem +"ής,"
              +stem +"ή|"+stem +"ιού,"
              +stem +"ή,"
              +stem +"ή,"
              +stem +"ιοί,"
              +stem +"ιών,"
              +stem +"ιούς,"
              +stem +"ιοί";
    }
    else if (subtype.equalsIgnoreCase("eln1c1c"))//2001.05.17 {
      if (greekTonosFind(fform)==1) {
            //η συνεχής
            stem=getFirstLettersIfSuffix(fform, 2);
            note="Κλίθηκε με τον eln1c1c(ο συνεχής): ΕΠΙΘΕΤΟ αρσενικό -ής (ανώμαλο).";
            forms=  "ο "
              +stem +"ής,"
              +stem +"ούς,"
              +stem +"ή,"
              +stem +"ή|"+stem +"ής,"
              +stem +"είς,"
              +stem +"ών,"
              +stem +"είς,"
              +stem +"είς";
      }
      if (greekTonosFind(fform)==2) {
            //ο ελώδης
            stem=getFirstLettersIfSuffix(fform, 2);
            note="Κλίθηκε με τον eln2c1c(ο ελώδης): ΕΠΙΘΕΤΟ αρσενικό -ής (ανώμαλο).";
            forms=  "ο "
              +stem +"ης,"
              +stem +"ους,"
              +stem +"η,"
              +stem +"η|"+stem +"ης,"
              +stem +"εις,"
              +greekTonosRemove(stem) +"ών," //πλήρης,πλήρων? η γραμμ λέει πληρών 2001.05.26
              +stem +"εις,"
              +stem +"εις";
      }
    }

    else if (subtype.equalsIgnoreCase("eln1c2")) {
          //ανισοσύλαβα
          if (greekTonosFind(fform)==1) {
            //ο καφετζής,καφετζήδες
            //ο πραματευτής,πραματευτάδες
            stem=getFirstLettersIfSuffix(fform, 2);
            note="Κλίθηκε με τον eln1c2(ο πραματευτής): αρσενικό -ης οξύτονο ανισοσύλλαβο.";
            if (fform.endsWith("τής")) {
              forms=  "ο "
                +stem +"ής,"
                +stem +"ή,"
                +stem +"ή,"
                +stem +"ή,"
                +stem +"άδες,"
                +stem +"άδων,"
                +stem +"άδες,"
                +stem +"άδες";
            }
            else {
            note="Κλίθηκε με τον eln1c2(ο καφετζής): αρσενικό -ης οξύτονο ανισοσύλλαβο.";
              forms=  "ο "
                +stem +"ής,"
                +stem +"ή,"
                +stem +"ή,"
                +stem +"ή,"
                +stem +"ήδες,"
                +stem +"ήδων,"
                +stem +"ήδες,"
                +stem +"ήδες";
            }
          }
          if (greekTonosFind(fform)==2) {
            //ο νοικοκύρης,νοικοκύρη,νοικοκύρηδες,νοικοκύρηδων
            stem=getFirstLettersIfSuffix(fform, 2);
            note="Κλίθηκε με τον eln1c2(ο νοικοκύρης): αρσενικό -ης παροξύτονο.";
            forms=  "ο "
              +stem +"ης,"
              +stem +"η,"
              +stem +"η,"
              +stem +"η,"
              +stem +"ηδες,"
              +stem +"ηδων,"
              +stem +"ηδες,"
              +stem +"ηδες";
          }
          else if (greekTonosFind(fform)==3) {
            //ο φούρναρης,φούρναρη,φουρνάρηδες,φουρνάρηδων
            stem=getFirstLettersIfSuffix(fform, 2);
            note="Κλίθηκε με τον eln1c2(ο φούρναρης): αρσενικό -ης προπαροξύτονο.";
            stem2=greekTonosIncrease(stem);
            forms=  "ο "
              +stem +"ης,"
              +stem +"η,"
              +stem +"η,"
              +stem +"η,"
              +stem2 +"ηδες,"
              +stem2 +"ηδων,"
              +stem2 +"ηδες,"
              +stem2 +"ηδες";
          }
    }

    else if (subtype.equalsIgnoreCase("eln1c3")) {
          //διπλό
          if (greekTonosFind(fform)==1) {
            //ο πραματευτής,πραματευτή,πραματευτές/άδες,πραματευτών/τάδων
            stem=getFirstLettersIfSuffix(fform, 2);
            note="Κλίθηκε με τον eln1c3(ο πραματευτής): αρσενικό -ης οξύτονο διπλό.";
            forms=  "ο "
              +stem +"ής,"
              +stem +"ή,"
              +stem +"ή,"
              +stem +"ή,"
              +stem +"ές|" +stem +"άδες,"
              +stem +"ών|" +stem +"άδων,"
              +stem +"ές|" +stem +"άδες,"
              +stem +"ές|" +stem +"άδες";
          }
          else if (greekTonosFind(fform)==2) {
            //ο αφέντης
            stem=getFirstLettersIfSuffix(fform, 2);
            stem2=greekTonosRemove(stem);
            note="Κλίθηκε με τον eln1c3(ο αφέντης): αρσενικό -ης παροξύτονο διπλό.";
            forms=  "ο "
              +stem +"ης,"
              +stem +"η,"
              +stem +"η,"
              +stem +"η,"
              +stem +"ες|" +stem2 +"άδες,"
              +stem2 +"ών|" +stem2 +"άδων,"
              +stem +"ες|" +stem2 +"άδες,"
              +stem +"ες|" +stem2 +"άδες";
          }
    }
    else if (subtype.equalsIgnoreCase("eln1c4"))//2001.05.17 {
        //ο βαθύς
        stem=getFirstLettersIfSuffix(fform, 2);
        note="Κλίθηκε με τον eln1c4(ο βαθύς): επίθετο αρσενικό -ύς.";
        forms=  "ο "
              +stem +"ύς,"
              +stem +"ύ|"+stem +"ιού,"
              +stem +"ύ,"
              +stem +"ύ,"
              +stem +"ιοί,"
              +stem +"ιών,"
              +stem +"ιούς,"
              +stem +"ιοί";
    }

    else if (subtype.equalsIgnoreCase("eln1d1")) {
      tonos=greekTonosFind(fform);
      if (tonos==1) {
          //ο ουρανός,ουρανού,ουρανό,ουρανοί,ουρανών,ουρανούς
          stem=getFirstLettersIfSuffix(fform, 2);
          note="Κλίθηκε με τον eln1d1(ο ουρανός): αρσενικό -ος οξύτονο.";
          forms=  "ο "
              +stem +"ός,"
              +stem +"ού,"
              +stem +"ό,"
              +stem +"έ,"
              +stem +"οί,"
              +stem +"ών,"
              +stem +"ούς,"
              +stem +"οί";
      }
      else if (tonos==2) {
          //ο δρόμος,δρόμου,δρόμο,δρόμοι,δρόμων,δρόμους
          stem=getFirstLettersIfSuffix(fform, 2);
          note="Κλίθηκε με τον eln1d1(ο δρόμος): αρσενικό -ος παροξύτονο.";
          forms=  "ο "
              +stem +"ος,"
              +stem +"ου,"
              +stem +"ο,"
              +stem +"ε,"
              +stem +"οι,"
              +stem +"ων,"
              +stem +"ους,"
              +stem +"οι";
      }
      else if (tonos==3) {
          //ο αντίλαλος αντίλαλου, αντίλαλο, αντίλαλοι, αντίλαλων, αντίλαλους
          stem=getFirstLettersIfSuffix(fform, 2);
          note="Κλίθηκε με τον eln1d1(ο καλόγερος): αρσενικό -ος προπαροξύτονο με γεν. προπαροξύτονη.";
          forms=  "ο "
              +stem +"ος,"
              +stem +"ου,"
              +stem +"ο,"
              +stem +"ε,"
              +stem +"οι,"
              +stem +"ων,"
              +stem +"ους,"
              +stem +"οι";
      }
    }

    else if (subtype.equalsIgnoreCase("eln1d2")) {
          //ο κίνδυνος,κινδύνου,κίνδυνο,κίνδυνοι,κινδύνων,κινδύνους
          stem=getFirstLettersIfSuffix(fform, 2);
          stem2=greekTonosIncrease(stem);
          note="Κλίθηκε με τον eln1d2(ο κίνδυνος): αρσενικό -ος προπαροξύτονο με γεν. παροξύτονη.";
          forms=  "ο "
              +stem +"ος,"
              +stem2 +"ου,"
              +stem +"ο,"
              +stem +"ε,"
              +stem +"οι,"
              +stem2 +"ων,"
              +stem2 +"ους,"
              +stem +"οι";
    }

    //αρσενικά σε -ους
    else if (subtype.equalsIgnoreCase("eln1e1")) {
        //ο παππούς,παππού,παππούδες,παππούδων
        stem=getFirstLettersIfSuffix(fform, 3);
        note="Κλίθηκε με τον eln1e1(ο παππούς): αρσενικό -ούς.";
        forms=  "ο "
              +stem +"ούς,"
              +stem +"ού,"
              +stem +"ού,"
              +stem +"ού,"
              +stem +"ούδες,"
              +stem +"ούδων,"
              +stem +"ούδες,"
              +stem +"ούδες";
    }

  //*********************************************************************
  //ΘΗΛΥΚΑ
    else if (subtype.equalsIgnoreCase("eln2a1")) {
          //η καρδιά,καρδιάς,καρδιές,καρδιών
          stem=getFirstLettersIfSuffix(fform, 1);
          note="Κλίθηκε με τον eln2a1(η καρδιά): θηλυκό -α ισοσύλλαβο.";
          forms=  "η "
              +stem +"ά,"
              +stem +"άς,"
              +stem +"ά,"
              +stem +"ά,"
              +stem +"ές,"
              +stem +"ών,"
              +stem +"ές,"
              +stem +"ές";
    }
    else if (subtype.equalsIgnoreCase("eln2a1b"))//2001.05.17 {
          //η γλυκιά,γλυκιάς
          stem=getFirstLettersIfSuffix(fform, 2);
          note="Κλίθηκε με τον eln2a1b(η γλυκιά): ΕΠΙΘΕΤΟ θηλυκό -ιά ισοσύλλαβο.";
          forms=  "η "
              +stem +"ιά,"
              +stem +"ιάς,"
              +stem +"ιά,"
              +stem +"ιά,"
              +stem +"ές,"
              +stem +"ών,"
              +stem +"ές,"
              +stem +"ές";
    }
    else if (subtype.equalsIgnoreCase("eln2a2")) {
          //η γιαγιά,γιαγιάς,γιαγιάδες,γιαγιάδων
          stem=getFirstLettersIfSuffix(fform, 1);
          note="Κλίθηκε με τον eln2a2(η γιαγιά): θηλυκό -α ανισοσύλλαβο.";
          forms=  "η "
              +stem +"ά,"
              +stem +"άς,"
              +stem +"ά,"
              +stem +"ά,"
              +stem +"άδες,"
              +stem +"άδων,"
              +stem +"άδες,"
              +stem +"άδες";
    }
    else if (subtype.equalsIgnoreCase("eln2a3")) {
          //η θάλασσα
          //η ώρα,ώρας,ώρες,ωρών
          stem=getFirstLettersIfSuffix(fform, 1);
          note="Κλίθηκε με τον eln2a3(η ώρα): θηλυκό -α γεν.πληθ.οξύτονη.";
          forms=  "η "
              +stem +"α,"
              +stem +"ας,"
              +stem +"α,"
              +stem +"α,"
              +stem +"ες,"
              +greekTonosRemove(stem) +"ών,"
              +stem +"ες,"
              +stem +"ες";
    }
    else if (subtype.equalsIgnoreCase("eln2a4")) {
          if (greekTonosFind(fform)==2) {
            //η ελπίδα,ελπίδας,ελπίδες,ελπίδων
            stem=getFirstLettersIfSuffix(fform, 1);
            note="Κλίθηκε με τον eln2a4(η ελπίδα): θηλυκό -α παροξύτονο με γεν.πληθ.παροξύτονη.";
            forms=  "η "
              +stem +"α,"
              +stem +"ας,"
              +stem +"α,"
              +stem +"α,"
              +stem +"ες,"
              +stem +"ων,"
              +stem +"ες,"
              +stem +"ες";
          }
          else if (greekTonosFind(fform)==3) {
            //η οντότητα,οντότητας,οντότητες,οντοτήτων
            note="Κλίθηκε με τον eln2a4(η οντότητα): θηλυκό -α προπαροξύτονο με γεν.πληθ.παροξύτονη.";
            stem=getFirstLettersIfSuffix(fform, 1);
            forms=  "η "
              +stem +"α,"
              +stem +"ας,"
              +stem +"α,"
              +stem +"α,"
              +stem +"ες,"
              +greekTonosIncrease(stem) +"ων,"
              +stem +"ες,"
              +stem +"ες";
          }
    }
    else if (subtype.equalsIgnoreCase("eln2a5")) //2001.05.17 {
            //η πλούσια,πλούσιας
            stem=getFirstLettersIfSuffix(fform, 1);
            note="Κλίθηκε με τον eln2a5(η πλούσια): θηλυκό ΕΠΙΘΕΤΟ -α προπαροξ με γεν.πληθ. προπαροξ.";
            forms=  "η "
              +stem +"α,"
              +stem +"ας,"
              +stem +"α,"
              +stem +"α,"
              +stem +"ες,"
              +stem +"ων,"
              +stem +"ες,"
              +stem +"ες";
    }
    else if (subtype.equalsIgnoreCase("eln2a5b")) //2001.05.27 {
            //η φρέσκια (επίθετο)
            stem=getFirstLettersIfSuffix(fform, 2);
            note="Κλίθηκε με τον eln2a5b(η φρέσκια): θηλυκό ΕΠΙΘΕΤΟ -α προπαροξ με γεν.πληθ. προπαροξ.";
            forms=  "η "
              +stem +"ια,"
              +stem +"ιας,"
              +stem +"ια,"
              +stem +"ια,"
              +stem +"ες,"
              +stem +"ων,"
              +stem +"ες,"
              +stem +"ες";
    }

    else if (subtype.equalsIgnoreCase("eln2b1")) {
          if (greekTonosFind(fform)==2) {
            //η σκέψη,σκέψης,σκέψεις,σκέψεων
            stem=getFirstLettersIfSuffix(fform, 1);
            note="Κλίθηκε με τον eln2b1(η σκέψη): θηλυκό -η παροξύτονο αρχαιόκλιτο.";
            forms=  "η "
              +stem +"η,"
              +stem +"ης|"+stem +"εως,"
              +stem +"η,"
              +stem +"η,"
              +stem +"εις,"
              +stem +"εων,"
              +stem +"εις,"
              +stem +"εις";
          }
          else if (greekTonosFind(fform)==3) {
            //η δύναμη,δύναμης,δυνάμεις,δυνάμεων
            stem=getFirstLettersIfSuffix(fform, 1);
            stem2=greekTonosIncrease(stem);
            note="Κλίθηκε με τον eln2b1(η δύναμη): θηλυκό -η προπαροξύτονο αρχαιόκλιτο.";
            forms=  "η "
              +stem +"η,"
              +stem +"ης|"+stem2 +"εως,"
              +stem +"η,"
              +stem +"η,"
              +stem2 +"εις,"
              +stem2 +"εων,"
              +stem2 +"εις,"
              +stem2 +"εις";
          }
    }
    else if (subtype.equalsIgnoreCase("eln2b2")) {
          if (greekTonosFind(fform)==1) {
            //η ψυχή,ψυχής,ψυχές,ψυχών
            stem=getFirstLettersIfSuffix(fform, 1);
            note="Κλίθηκε με τον eln2b2(η ψυχή): θηλυκό -η οξύτονο νεόκλιτο.";
            forms=  "η "
              +stem +"ή,"
              +stem +"ής,"
              +stem +"ή,"
              +stem +"ή,"
              +stem +"ές,"
              +stem +"ών,"
              +stem +"ές,"
              +stem +"ές";
          }
          else if (greekTonosFind(fform)==2) {
            //η νίκη,νίκης,νίκες,νικών
            stem=getFirstLettersIfSuffix(fform, 1);
            note="Κλίθηκε με τον eln2b2(η νίκη): θηλυκό -η παροξύτονο νεόκλιτο.";
            forms=  "η "
              +stem +"η,"
              +stem +"ης,"
              +stem +"η,"
              +stem +"η,"
              +stem +"ες,"
              +greekTonosRemove(stem) +"ών|-,"
              +stem +"ες,"
              +stem +"ες";
          }
          else if (greekTonosFind(fform)==3)//2001.05.25 {
            //η ζάχαρη
            stem=getFirstLettersIfSuffix(fform, 1);
            note="Κλίθηκε με τον eln2b2(η ζάχαρη): θηλυκό -η προπαροξύτονο νεόκλιτο.";
            forms=  "η "
              +stem +"η,"
              +stem +"ης,"
              +stem +"η,"
              +stem +"η,"
              +stem +"ες,"
              +"-,"
              +stem +"ες,"
              +stem +"ες";
          }
    }

    else if (subtype.equalsIgnoreCase("eln2b3")) //2001.05.17 {
            //η άσπρη,άσπρης,άσπρη,άσπρη,άσπρες,άσπρων,άσπρες,άσπρες
            //η όμορφη,όμορφης...
            stem=getFirstLettersIfSuffix(fform, 1);
            note="Κλίθηκε με τον eln2b3(η άσπρη/όμορφη): επίθετο θηλυκό -η παροξύτονο, διατηρεί τόνο.";
            forms=  "η "
              +stem +"η,"
              +stem +"ης,"
              +stem +"η,"
              +stem +"η,"
              +stem +"ες,"
              +stem +"ων,"
              +stem +"ες,"
              +stem +"ες";
    }

  //θηλυκά σε -ς:
    else if (subtype.equalsIgnoreCase("eln2c1")) {
      if (greekTonosFind(fform)==3) {
        //αρχαιόκλιτο: η διάμετρος,διαμέτρου,διάμετρο,διάμετροι,διαμέτρων,διαμέτρους
        stem=getFirstLettersIfSuffix(fform, 2);
        stem2=greekTonosIncrease(stem);
        note="Κλίθηκε με τον eln2c1(η διάμετρος): θηλυκό -ος προπαροξύτονο αρχαιόκλιτο.";
        forms=  "η "
              +stem +"ος,"
              +stem2 +"ου,"
              +stem +"ο,"
              +stem +"ο,"
              +stem +"οι|"+stem +"ες,"
              +stem2 +"ων,"
              +stem2 +"ους|"+stem +"ες,"
              +stem +"οι";
      }
      if (greekTonosFind(fform)==2) {
        //αρχαιόκλιτο: η διχοτόμος,διχοτόμου
        stem=getFirstLettersIfSuffix(fform, 2);
        note="Κλίθηκε με τον eln2c1(η διχοτόμος): θηλυκό -ος παροξύτονο αρχαιόκλιτο.";
        forms=  "η "
              +stem +"ος,"
              +stem +"ου,"
              +stem +"ο,"
              +stem +"ο,"
              +stem +"οι|"+stem +"ες,"
              +stem +"ων,"
              +stem +"ους|"+stem +"ες,"
              +stem +"οι";
      }
      else {
        //αρχαιόκλιτο: η κιβωτός,κιβωτού,
        stem=getFirstLettersIfSuffix(fform, 2);
        note="Κλίθηκε με τον eln2c1(η κιβωτός): θηλυκό -ος οξύτονο αρχαιόκλιτο.";
        forms=  "η "
              +stem +"ός,"
              +stem +"ού,"
              +stem +"ό,"
              +stem +"ό,"
              +stem +"οί|"+stem +"ές,"
              +stem +"ών,"
              +stem +"ούς|"+stem +"ές,"
              +stem +"οί";
      }
    }
    else if (subtype.equalsIgnoreCase("eln2c2")) {
      if (greekTonosFind(fform)==1) {
            //η συνεχής
            stem=getFirstLettersIfSuffix(fform, 2);
            note="Κλίθηκε με τον eln2c2(η συνεχής): ΕΠΙΘΕΤΟ θηλυκό -ής (ανώμαλο).";
            forms=  "η "
              +stem +"ής,"
              +stem +"ούς,"
              +stem +"ή,"
              +stem +"ής,"
              +stem +"είς,"
              +stem +"ών,"
              +stem +"είς,"
              +stem +"είς";
      }
      if (greekTonosFind(fform)==2) {
            //η ελώδης
            stem=getFirstLettersIfSuffix(fform, 2);
            note="Κλίθηκε με τον eln2c2(η ελώδης): ΕΠΙΘΕΤΟ θηλυκό -ής (ανώμαλο).";
            forms=  "η "
              +stem +"ης,"
              +stem +"ους,"
              +stem +"η,"
              +stem +"ης,"
              +stem +"εις,"
              +greekTonosRemove(stem) +"ών,"
              +stem +"εις,"
              +stem +"εις";
      }
    }

    else if (subtype.equalsIgnoreCase("eln2d1")) {
        //η αλεπού,αλεπούς,αλεπούδες,αλεπούδων
        stem=getFirstLettersIfSuffix(fform, 2);
        note="Κλίθηκε με τον eln2d1(η αλεπού): θηλυκό -ού.";
        forms=  "η "
              +stem +"ού,"
              +stem +"ούς,"
              +stem +"ού,"
              +stem +"ού,"
              +stem +"ούδες,"
              +stem +"ούδων,"
              +stem +"ούδες,"
              +stem +"ούδες";
    }

    else if (subtype.equalsIgnoreCase("eln2e1")) {
      if (greekTonosFind(fform)==1) {
        //η Αργυρώ
        stem=getFirstLettersIfSuffix(fform, 1);
        note="Κλίθηκε με τον eln2e1(η Αργυρώ): θηλυκό -ω οξύτονο.";
        forms=  "η "
              +stem +"ώ,"
              +stem +"ώς,"
              +stem +"ώ,"
              +stem +"ώ,"
              +"-,"
              +"-,"
              +"-,"
              +"-";
      }
      else if (greekTonosFind(fform)==2) {
        //η Φρόσω
        stem=getFirstLettersIfSuffix(fform, 1);
        note="Κλίθηκε με τον eln2e1(η Φρόσω): θηλυκό -ω παροξύτονο.";
        forms=  "η "
              +stem +"ω,"
              +stem +"ως,"
              +stem +"ω,"
              +stem +"ω,"
              +"-,"
              +"-,"
              +"-,"
              +"-";
      }
    }

  //*********************************************************************
  //ΟΥΔΕΤΕΡΑ

    else if (subtype.equalsIgnoreCase("eln3a1")) {
        if (greekTonosFind(fform)==2) {
          //το κύμα,κύματος,κύματα,κυμάτων
          stem=getFirstLettersIfSuffix(fform, 1);
          note="Κλίθηκε με τον eln3a1(το κύμα): ουδέτερο -μα παροξύτονο.";
          forms=  "το "
              +stem +"α,"
              +stem +"ατος,"
              +stem +"α,"
              +stem +"α,"
              +stem +"ατα,"
              +greekTonosRemove(stem) +"άτων,"
              +stem +"ατα,"
              +stem +"ατα";
        }
        else if (greekTonosFind(fform)==3) {
          //το όνομα,ονόματος,ονόματα,ονομάτων
          stem=getFirstLettersIfSuffix(fform, 1); //όνο-
          stem2=greekTonosIncrease(stem);         //ονό-
          stem3=greekTonosRemove(stem);           //ονο-
          note="Κλίθηκε με τον eln3a1(το όνομα): ουδέτερο -μα προπαροξύτονο.";
          forms=  "το "
              +stem +"α,"
              +stem2 +"ατος,"
              +stem +"α,"
              +stem +"α,"
              +stem2 +"ατα,"
              +stem3 +"άτων,"
              +stem2 +"ατα,"
              +stem2 +"ατα";
        }
    }

    else if (subtype.equalsIgnoreCase("eln3b1")) {
      if (greekTonosFind(fform)==1) {
        //το παιδί,παιδιού,παιδιά,παιδιών
        stem=getFirstLettersIfSuffix(fform, 1);
        note="Κλίθηκε με τον eln3b1(το παιδί): ουδέτερο -ι οξύτονο.";
        forms=  "το "
              +stem +"ί,"
              +stem +"ιού,"
              +stem +"ί,"
              +stem +"ί,"
              +stem +"ιά,"
              +stem +"ιών,"
              +stem +"ιά,"
              +stem +"ιά";
      }
      else if (greekTonosFind(fform)==2) {
        //το τραγούδι,τραγουδιού,τραγούδια,τραγουδιών
        stem=getFirstLettersIfSuffix(fform, 1);
        note="Κλίθηκε με τον eln3b1(το τραγούδι): ουδέτερο -ι παροξύτονο.";
        forms=  "το "
              +stem +"ι,"
              +greekTonosRemove(stem) +"ιού,"
              +stem +"ι,"
              +stem +"ι,"
              +stem +"ια,"
              +greekTonosRemove(stem) +"ιών,"
              +stem +"ια,"
              +stem +"ια";
      }
    }
    else if (subtype.equalsIgnoreCase("eln3b2"))//2001.05.17 {
          //το βαθύ
          stem=getFirstLettersIfSuffix(fform, 2);
          note="Κλίθηκε με τον eln3b2(το βαθύ): επίθετο ουδέτερο -ύ.";
          forms=  "το "
              +stem +"ύ,"
              +stem +"ύ|"+stem +"ιού,"
              +stem +"ύ,"
              +stem +"ύ,"
              +stem +"ιά,"
              +stem +"ιών,"
              +stem +"ιά,"
              +stem +"ιά";
    }

    else if (subtype.equalsIgnoreCase("eln3c1")) {
          //το δέσιμο,δεσίματος,δεσίματα,δεσιμάτων
          stem=getFirstLettersIfSuffix(fform, 3);
          stem2=greekTonosRemove(stem);
          note="Κλίθηκε με τον eln3c1(το δέσιμο): ουδέτερο -ιμο.";
          forms=  "το "
              +stem +"ιμο,"
              +stem2 +"ίματος,"
              +stem +"ιμο,"
              +stem +"ιμο,"
              +stem2 +"ίματα,"
              +stem2 +"ιμάτων,"
              +stem2 +"ίματα,"
              +stem2 +"ίματα";
    }
    else if (subtype.equalsIgnoreCase("eln3c2")) {
      if (greekTonosFind(fform)==1) {
        //το βουνό,βουνού,βουνά,βουνών
        stem=getFirstLettersIfSuffix(fform, 1);
        note="Κλίθηκε με τον eln3c2(το βουνό): ουδέτερο -ο οξύτονο.";
        forms=  "το "
              +stem +"ό,"
              +stem +"ού,"
              +stem +"ό,"
              +stem +"ό,"
              +stem +"ά,"
              +stem +"ών,"
              +stem +"ά,"
              +stem +"ά";
      }
      else {
          //το πεύκο
          //το σίδερο,σίδερου,σίδερα,σίδερων
          stem=getFirstLettersIfSuffix(fform, 1);
          note="Κλίθηκε με τον eln3c2(το πεύκο/σίδερο): ουδέτερο -ο παροξύτονο/προπαροξ.";
          forms=  "το "
              +stem +"ο,"
              +stem +"ου,"
              +stem +"ο,"
              +stem +"ο,"
              +stem +"α,"
              +stem +"ων,"
              +stem +"α,"
              +stem +"α";
      }
    }

    else if (subtype.equals("eln3c3"))//2001.05.24 {
          //το πρόσωπο
          stem=getFirstLettersIfSuffix(fform, 1);
          stem2=greekTonosIncrease(stem);
          note="Κλίθηκε με τον eln3c3(το πρόσωπο): ουδέτερο -ο προπαροξ. που αλλάζει τόνο";
          forms=  "το "
              +stem +"ο,"
              +stem2 +"ου,"
              +stem +"ο,"
              +stem +"ο,"
              +stem +"α,"
              +stem2 +"ων,"
              +stem +"α,"
              +stem +"α";
    }

  //επίθετα σε -ς:
    else if (subtype.equalsIgnoreCase("eln3d1")) {
        //το κρέας,κρέατος,κρέατα,κρεάτων
        stem=getFirstLettersIfSuffix(fform, 2);
        note="Κλίθηκε με τον eln3d1(το κρέας): ουδέτερο -ας.";
        forms=  "το "
              +stem +"ας,"
              +stem +"ατος,"
              +stem +"ας,"
              +stem +"ας,"
              +stem +"ατα,"
              +greekTonosRemove(stem) +"άτων,"
              +stem +"ατα,"
              +stem +"ατα";
    }
    else if (subtype.equalsIgnoreCase("eln3d2")) {
        if (greekTonosFind(fform)==1) {
          //το γεγονός,γεγονότος,γεγονότα,γεγονότων
          stem=getFirstLettersIfSuffix(fform, 2);
          note="Κλίθηκε με τον eln3d2(το γεγονός): ουδέτερο -ος οξύτονο.";
          forms=  "το "
              +stem +"ός,"
              +stem +"ότος,"
              +stem +"ός,"
              +stem +"ός,"
              +stem +"ότα,"
              +stem +"ότων,"
              +stem +"ότα,"
              +stem +"ότα";
        }
        else if (greekTonosFind(fform)==2) {
          //το μέρος,μέρους,μέρη,μερών
          stem=getFirstLettersIfSuffix(fform, 2);
          note="Κλίθηκε με τον eln3d2(το μέρος): ουδέτερο -ος παροξύτονο.";
          forms=  "το "
              +stem +"ος,"
              +stem +"ους,"
              +stem +"ος,"
              +stem +"ος,"
              +stem +"η,"
              +greekTonosRemove(stem) +"ών,"
              +stem +"η,"
              +stem +"η";
        }
        else if (greekTonosFind(fform)==3) {
          //το έδαφος,εδάφους,εδάφη,εδαφών
          stem=getFirstLettersIfSuffix(fform, 2);
          stem2=greekTonosIncrease(stem);
          note="Κλίθηκε με τον eln3d2(το έδαφος): ουδέτερο -ος προπαροξύτονο.";
          forms=  "το "
              +stem +"ος,"
              +stem2 +"ους,"
              +stem +"ος,"
              +stem +"ος,"
              +stem2 +"η,"
              +greekTonosRemove(stem) +"ών,"
              +stem2 +"η,"
              +stem2 +"η";
        }
    }
    else if (subtype.equalsIgnoreCase("eln3d3")) {
        if (greekVowel_NumberFind(fform)==1) {
          //το φώς,φωτός,φώτα,φώτων
          stem=getFirstLettersIfSuffix(fform, 2);
          note="Κλίθηκε με τον eln3d3(το φως): ουδέτερο -ως μονοσύλλαβο.";
          forms=  "το "
              +stem +"ως,"
              +stem +"ωτός,"
              +stem +"ως,"
              +stem +"ως,"
              +stem +"ώτα,"
              +stem +"ώτων,"
              +stem +"ώτα,"
              +stem +"ώτα";
        }
        else {
          //το καθεστώς,καθεστώτος,καθεστώτα,καθεστώτων
          stem=getFirstLettersIfSuffix(fform, 2);
          note="Κλίθηκε με τον eln3d3(το καθεστώς): ουδέτερο -ως μή μονοσύλλαβο.";
          forms=  "το "
              +stem +"ώς,"
              +stem +"ώτος,"
              +stem +"ώς,"
              +stem +"ώς,"
              +stem +"ώτα,"
              +stem +"ώτων,"
              +stem +"ώτα,"
              +stem +"ώτα";
        }
    }
    else if (subtype.equalsIgnoreCase("eln3d4"))//2001.05.17 {
        if (greekTonosFind(fform)==1) {
          //το συνεχές
          stem=getFirstLettersIfSuffix(fform, 2);
          note="Κλίθηκε με τον eln3d4(το συνεχές): ΕΠΙΘΕΤΟ ουδέτερο -ές.";
          forms=  "το "
              +stem +"ές,"
              +stem +"ούς,"
              +stem +"ές,"
              +stem +"ές,"
              +stem +"ή,"
              +stem +"ών,"
              +stem +"ή,"
              +stem +"ή";
        }
        else if (greekTonosFind(fform)==2) {
          //το ελώδες
          stem=getFirstLettersIfSuffix(fform, 2);
          note="Κλίθηκε με τον eln3d4(το ελώδες): ΕΠΙΘΕΤΟ ουδέτερο -ες.";
          forms=  "το "
              +stem +"ες,"
              +stem +"ους,"
              +stem +"ες,"
              +stem +"ες,"
              +stem +"η,"
              +greekTonosRemove(stem) +"ών," //σύμφωνα με τη γραμματική. Αλλα στο 'πλήρες' μάλλον 'πλήρων' 2001.05.26
              +stem +"η,"
              +stem +"η";
        }
    }

    else if (subtype.equalsIgnoreCase("eln3e1"))//2001.05.20 {
          //το βαθύ
          stem=getFirstLettersIfSuffix(fform, 1);
          note="Κλίθηκε με τον eln3e1(το βαθύ): ΕΠΙΘΕΤΟ ουδέτερο -ύ.";
          forms=  "το "
              +stem +"ύ,"
              +stem +"ύ|"+stem +"ιού,"
              +stem +"ύ,"
              +stem +"ύ,"
              +stem +"ιά,"
              +stem +"ιών,"
              +stem +"ιά,"
              +stem +"ιά";
    }

  //ΑΝΩΜΑΛΑ
    else if (subtype.equalsIgnoreCase("eln4a1")) //2001.05.13 {
      forms=getFormsIfIrregular();
    }

    //unknown case
    else {
      forms=fform;
    }

  return sMembers
}
*/

/**
 * DOING: it finds info of a-Greek-case.
 * INPUT:
 *  - sWordIn = ξαδέρφη-η/ksadhérfi-i/
 *  - sMethodIn = caseEllnMnG2XiT2SeuNucF2Bo
 */
function fFindCaseinfoElln (sWordIn, sMethodIn) {
  let
    oCase = {}, //the output info
    aInfo = [],
    aMcs,
    n,
    sStemM, //stem nominativeSingular of method
    sStemMRem, //remove
    sStemMInc, //increase
    sStemMDec, //decrease
    sStemW, //stem nominativeSingular of word
    sStemWRem,
    sStemW3,
    sStemMx, //
    sSufxM,
    sSufxMx,
    sWord = sWordIn.substr(0, sWordIn.indexOf('-')), //ξαδέρφη
    sWordArt = sWordIn.substr(0, sWordIn.indexOf('/')), //ξαδέρφη-η
    sWordArtSpch = sWordIn.substr(sWordIn.indexOf('/')), ///ksadhérfi-i/
    sWordGS, //genitiveSingular
    sWordAS, //accusativeSingular
    sWordVS, //vocativeSingular
    sWordNP, //nominativePlural
    sWordGP, //genitivePlural
    sWordAP, //accusativePlurl
    sWordVP, //vocativePlural
    sWordX

  aMcs = moFs.readFileSync(sFileElln).toString().split('\n')

  n = aMcs.findIndex(function(sLn){
    return sLn.indexOf('"idLEllncase' +sMethodIn.substring(8) +'dsn"') > 1
  })
  //we found method
  sLn = aMcs[n+1] //<p>description::
  sLn = aMcs[n+2] //<br>× caseEllnMnG2Xi
  aInfo.push(sLn.substring(10))
  sLn = aMcs[n+3] //</p>
  sLn = aMcs[n+4] //<table class="clsTblBorderNo">
  sLn = aMcs[n+5] //<tr><td>η<td>νύφ-η
  aInfo.push(sLn.substring(19))
  sLn = aMcs[n+6] //<tr><td>της<td>νύφ-ης
  aInfo.push(sLn.substring(21))
  sLn = aMcs[n+7] //<tr><td>την<td>νύφ-η
  aInfo.push(sLn.substring(21))
  sLn = aMcs[n+8] //<tr><td><td>νύφ-η
  aInfo.push(sLn.substring(18))
  sLn = aMcs[n+9] //<tr><td>οι<td>νύφ-ες|νυφ-άδες
  aInfo.push(sLn.substring(20))
  sLn = aMcs[n+10] //<tr><td>των<td>νυφ-άδων
  aInfo.push(sLn.substring(21))
  sLn = aMcs[n+11] //<tr><td>τις<td>νύφ-ες|νυφ-άδες
  aInfo.push(sLn.substring(21))
  sLn = aMcs[n+12] //<tr><td><td>νύφ-ες|νυφ-άδες
  aInfo.push(sLn.substring(18))
  console.log(aInfo)

  //find stems
  sStemM = aInfo[1].substr(0, aInfo[1].indexOf('-'))
  sStemMRem = moLagUtil.fGreektonosRemove(sStemM)
  sSufxM = aInfo[1].substr(aInfo[1].lastIndexOf('-')+1)
  sStemW = sWord.substr(0, sWord.length-sSufxM.length) //ξαδέρφ
  sStemWRem = moLagUtil.fGreektonosRemove(sStemW)

  //γενι-ενικ gs
  if (aInfo[2].indexOf('|') != -1) {
    //we have many forms
    const aExl = aInfo[2].split('|')
    sWordGS = fFindWordX(aExl[0]) 
    for (n=1; n<aExl.length; n++) {
      sWordGS = sWordGS +'|' +fFindWordX(aExl[n]) 
    }
  } else {
    sWordGS = fFindWordX(aInfo[2])
  }
  //console.log(sWordGS)

  /** it returns an-inflection */
  function fFindWordX(sMethexlIn) {
    sStemMx = sMethexlIn.substr(0, sMethexlIn.indexOf('-'))
    sSufxMx = sMethexlIn.substr(sMethexlIn.indexOf('-')+1)
    if (sStemMx === sStemM) sWordX = sStemW + sSufxMx
    else if (sStemMx === sStemMRem) sWordX = sStemWRem + sSufxMx
    sWordX = sWordX + moLagUtil.fGreekwordFindPhonemic(sWordX)
    if (sWordX.indexOf('111') != -1) console.log(sWordX)
    return sWordX
  }
  
  oCase.McsElln1 = '.λέξηΕλλν.' + sWordIn +'@wordElln,'
  oCase.McsElln2 = '.ουσιαστικό.' + sWordIn +'@wordElln,'
  oCase.nomSin = sWord + sWordArtSpch.substr(0, sWordArtSpch.indexOf('-')) + '/'
  oCase.genSin = sWordGS

  //αιτ-ενικ as
  if (aInfo[3].indexOf('|') != -1) {
    //we have many forms
    const aExl = aInfo[3].split('|')
    sWordAS = fFindWordX(aExl[0]) 
    for (n=1; n<aExl.length; n++) {
      sWordAS = sWordAS +'|' +fFindWordX(aExl[n]) 
    }
  } else {
    sWordAS = fFindWordX(aInfo[3])
  }
  oCase.accSin = sWordAS

  //κλητ-ενικ vs
  if (aInfo[4].indexOf('|') != -1) {
    //we have many forms
    const aExl = aInfo[4].split('|')
    sWordVS = fFindWordX(aExl[0]) 
    for (n=1; n<aExl.length; n++) {
      sWordVS = sWordVS +'|' +fFindWordX(aExl[n]) 
    }
  } else {
    sWordVS = fFindWordX(aInfo[3])
  }
  oCase.vocSin = sWordVS

  //ονομ-πληθ np
  if (aInfo[5].indexOf('|') != -1) {
    //we have many forms
    const aExl = aInfo[5].split('|')
    sWordNP = fFindWordX(aExl[0]) 
    for (n=1; n<aExl.length; n++) {
      sWordNP = sWordNP +'|' +fFindWordX(aExl[n]) 
    }
  } else {
    sWordNP = fFindWordX(aInfo[4])
  }
  oCase.nomPlu = sWordNP

  //γενι-πληθ gp
  if (aInfo[6].indexOf('|') != -1) {
    //we have many forms
    const aExl = aInfo[6].split('|')
    sWordGP = fFindWordX(aExl[0]) 
    for (n=1; n<aExl.length; n++) {
      sWordGP = sWordGP +'|' +fFindWordX(aExl[n]) 
    }
  } else {
    sWordGP = fFindWordX(aInfo[6])
  }
  oCase.genPlu = sWordGP

  //αιτ-πληθ ap
  if (aInfo[7].indexOf('|') != -1) {
    //we have many forms
    const aExl = aInfo[7].split('|')
    sWordAP = fFindWordX(aExl[0]) 
    for (n=1; n<aExl.length; n++) {
      sWordAP = sWordAP +'|' +fFindWordX(aExl[n]) 
    }
  } else {
    sWordAP = fFindWordX(aInfo[7])
  }
  oCase.accPlu = sWordAP

  //κλητ-πληθ vp
  if (aInfo[8].indexOf('|') != -1) {
    //we have many forms
    const aExl = aInfo[8].split('|')
    sWordVP = fFindWordX(aExl[0]) 
    for (n=1; n<aExl.length; n++) {
      sWordVP = sWordVP +'|' +fFindWordX(aExl[n]) 
    }
  } else {
    sWordVP = fFindWordX(aInfo[8])
  }
  oCase.vocPlu = sWordNP


  return oCase
}

/**
 * DOING: it finds the-members of a-Greek-adjective.
 */
function fFindAdjvmbrElln (sBaseIn, sMethodIn) {
  sMembers = sBaseIn
  return sMembers
}

/**
 * DOING: it finds the-members of a-Greek-verb.
 */
function fFindVerbmbrElln (sBaseIn, sMethodIn) {
  sMembers = sBaseIn
  return sMembers
}

export {
  aVerbEllnRegularNo,
  fFindCaseinfoElln
}
