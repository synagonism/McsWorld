/*
 * version: 2014.01.09
 * SetClass_hide.java - Sets IDs on paragraphs.
 * :font:monospaced16 :tab:2 :indent:2 :wrap:72
 *
 * Copyright (C) 2013 Kaseluris-Nikos-1959 (HoKoNoUmo)
 * nikkas@otenet.gr
 * users.otenet.gr/~nikkas/
 *
 * This program is distributed under the terms of the LGPLv3 license.
 * http://www.gnu.org/licenses/lgpl.html
 */

import java.io.*;
import java.util.*;
import java.text.*;

/**
 * INPUT: an html5IdTocPreview with IDs, but not class=hide link element.<br/>
 * OUTPUT: this file with class=hide link element on h, p, table,
 * figure, ol, ul, details elements.
 *
 * @modified 2014.01.09
 * @since 2014.01.09
 * @author HoKoNoUmo
 */
public class SetClass_hide
{

  private BufferedWriter  wrBuffered;
  private String          sLast_id="";


  /**
   *
   * @modified 2014.01.09
   * @since 2014.01.09
   * @author HoKoNoUmo
   */
  public static void main(String args[])
  {
    if (args.length!=1) {
      System.out.println("USAGE:");
      System.out.println("java SetClass_hide <file-name-in>");
    }
    else {
      new SetClass_hide(args[0]);
    }
  }


  /**
   * Constructor.
   *
   * @param sIn
   *    The file-in.
   * @modified 2014.01.09
   * @since 2014.01.09
   * @author HoKoNoUmo
   */
  public SetClass_hide(String sIn)
  {
    BufferedReader rdIn;
    try {
      FileInputStream fis = new FileInputStream(sIn);
      InputStreamReader isr = new InputStreamReader(fis, "UTF-8");
      rdIn = new BufferedReader(isr);

      FileOutputStream fos= new FileOutputStream(sIn+"-out.html");
      OutputStreamWriter osw= new OutputStreamWriter(fos, "UTF-8");
      wrBuffered= new BufferedWriter(osw);

      String ln= null;
      while ((ln= rdIn.readLine()) != null)
      {

        //read IDs
        if (ln.startsWith("  <h1 id=")
          ||ln.startsWith("  <h2 id=")
          ||ln.startsWith("  <h3 id=")
          ||ln.startsWith("  <h4 id=")
          ||ln.startsWith("  <h5 id=")
          ||ln.startsWith("  <h6 id=")
          ||ln.startsWith("  <p id=")
          ||ln.startsWith("  <table id=")
          ||ln.startsWith("  <figure id=")
          ||ln.startsWith("  <ul id=")
          ||ln.startsWith("  <ol id=")
          ||ln.startsWith("  <details id=")
          ){
          	//store id
          	try {
            sLast_id= ln.substring(ln.indexOf("id=")+4,
                     ln.indexOf("\"",ln.indexOf("id=")+5));
          } catch (Exception e) {
            System.out.println("!!!ex: "+ln);
          }
          writeLine(ln);
        }

        //add links
        else if (ln.startsWith("    </h1>") ){
          //add the id on line
          	try {
            ln= "    <a class=\"hide\" href=\"#" +sLast_id +"\">¶</a></h1>";
          } catch (Exception e) {
            System.out.println("!!!ex: "+ln);
          }
          writeLine(ln);
        }

        else if (ln.startsWith("    </h2>") ){
          //add the id on line
          	try {
            ln= "    <a class=\"hide\" href=\"#" +sLast_id +"\">¶</a></h2>";
          } catch (Exception e) {
            System.out.println("!!!ex: "+ln);
          }
          writeLine(ln);
        }

        else if (ln.startsWith("    </h3>") ){
          //add the id on line
          	try {
            ln= "    <a class=\"hide\" href=\"#" +sLast_id +"\">¶</a></h3>";
          } catch (Exception e) {
            System.out.println("!!!ex: "+ln);
          }
          writeLine(ln);
        }

        else if (ln.startsWith("    </h4>") ){
          //add the id on line
          	try {
            ln= "    <a class=\"hide\" href=\"#" +sLast_id +"\">¶</a></h4>";
          } catch (Exception e) {
            System.out.println("!!!ex: "+ln);
          }
          writeLine(ln);
        }

        else if (ln.startsWith("    </h5>") ){
          //add the id on line
          	try {
            ln= "    <a class=\"hide\" href=\"#" +sLast_id +"\">¶</a></h5>";
          } catch (Exception e) {
            System.out.println("!!!ex: "+ln);
          }
          writeLine(ln);
        }

        else if (ln.startsWith("    </h6>") ){
          //add the id on line
          	try {
            ln= "    <a class=\"hide\" href=\"#" +sLast_id +"\">¶</a></h6>";
          } catch (Exception e) {
            System.out.println("!!!ex: "+ln);
          }
          writeLine(ln);
        }


        else if (ln.startsWith("    </p>") ){
          //add the id on line
          	try {
            ln= "    <a class=\"hide\" href=\"#" +sLast_id +"\">¶</a></p>";
          } catch (Exception e) {
            System.out.println("!!!ex: "+ln);
          }
          writeLine(ln);
        }

        else if (ln.startsWith("    </table>") ){
          //add the id on line
          	try {
            ln= "    <a class=\"hide\" href=\"#" +sLast_id +"\">¶</a></table>";
          } catch (Exception e) {
            System.out.println("!!!ex: "+ln);
          }
          writeLine(ln);
        }

        else if (ln.startsWith("    </figure>") ){
          //add the id on line
          	try {
            ln= "    <a class=\"hide\" href=\"#" +sLast_id +"\">¶</a></figure>";
          } catch (Exception e) {
            System.out.println("!!!ex: "+ln);
          }
          writeLine(ln);
        }

        else if (ln.startsWith("    </ul>") ){
          //add the id on line
          	try {
            ln= "    <a class=\"hide\" href=\"#" +sLast_id +"\">¶</a></ul>";
          } catch (Exception e) {
            System.out.println("!!!ex: "+ln);
          }
          writeLine(ln);
        }

        else if (ln.startsWith("    </ol>") ){
          //add the id on line
          	try {
            ln= "    <a class=\"hide\" href=\"#" +sLast_id +"\">¶</a></ol>";
          } catch (Exception e) {
            System.out.println("!!!ex: "+ln);
          }
          writeLine(ln);
        }

        else if (ln.startsWith("    </details>") ){
          //add the id on line
          	try {
            ln= "    <a class=\"hide\" href=\"#" +sLast_id +"\">¶</a></details>";
          } catch (Exception e) {
            System.out.println("!!!ex: "+ln);
          }
          writeLine(ln);
        }


        else {
          writeLine(ln);
        }
      }

      rdIn.close();
      wrBuffered.close();
    } catch (IOException ioe) {
      System.out.println(">>SetClass_hide.Constructor: "+ioe.toString());
    }
  }



  /**
   *
   * @modified 2014.01.09
   * @since 2014.01.09
   * @author HoKoNoUmo
   */
  public String setDateCurrent()
  {
    SimpleDateFormat formatter= new SimpleDateFormat ("yyyy.MM.dd");
    Date currentTime= new Date();
    String stringDate= formatter.format(currentTime);
    return stringDate;
  }


  /**
   * Writes a line in the buffer.
   *
   * @modified 2014.01.09
   * @since 2014.01.09
   * @author HoKoNoUmo
   */
  private void writeLine(String sLn){
    try {
      wrBuffered.write(sLn);
      wrBuffered.newLine();
    } catch (IOException e) {
      System.out.println("ex-SetClass_hide.writeLine:: "+e.toString());
    }
  }

}