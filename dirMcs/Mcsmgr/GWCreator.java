/**
 * LastModified: version 0.2 - 2002.02.19
 * Created: 2002.02.07
 *
 */


public class GWCreator extends Applet implements ActionListener
{
	private TextField fieldWord;
	private TextField fieldPron;
	private TextField fieldSyllF1; //starting syllable.
	private TextField fieldSyllF2; //second syllable.
	private TextField fieldSyllL2; //before last syllable.
	private TextField fieldSyllL1; // ending syllable.

	private Choice choiceSyllNumber;
	private Choice choiceStress;
	private Choice choiceProb;

	private Button btCreate;

 	private String ts="";//a temporal field to hold text for processing.

	//the fonal first-word-clusters:
	private String arFirstCluster[]=
		{"V","VY","VYY","VΔ","VL","VR",
		 "Y","YΔ","YL","YN","YR",
		 "YY",
		 "Δ","ΔYY","ΔR",
		 "Z","ZV","ZM","ZB",
		 "ZZ",
		 "Q","QL","QN","QR","QHH",
		 "K","KL","KN","KR","KS","KT",
		 "KK",
		 "L","LL",
		 "M","MN","MNN",
		 "N","NN",
		 "P","PYY","PL","PN","PR","PS","PT",
		 "R",
		 "S","SQ","SK","SKK","SL","SP","ST","SF","SH",
		 "SKL","SKN","SKR","SPYY","SPL","SPR","STYY","STR","SFR",
		 "SS",
		 "T","TYY","TM","TR","TS",
		 "F","FQ","FL","FR","FT","FHH","FTYY",
		 "H","HQ","HL","HN","HR","HT",
		 "HH",
		 "B","BL","BR",
		 "D","DR","DZ","DZZ",
		 "G","GL","GR",
		 "GG"};

	//Holds the sequence of sounds:
	private String arSequence[]=
		{"V","VY","VYY","VΔ","VL","VR",
		 "VZM","VM","VN",
		 "Y","YΔ","YL","YN","YR","YY",
		 "YM",
		 "Δ","ΔYY","ΔR",
		 "Z","ZV","ZM","ZB","ZZ",
		 "ZY","ZΔ","ZL","ZN", //όλα με σ γράμμα.
		 "Q","QL","QN","QR","QHH",
		 "QM",
		 "K","KL","KN","KR","KS","KT",
		 "KK",
		 "KV","KΔ","KZ","KQ","KM","KP","KPL","KPN","KPR","KSS","KTR","KF","KFR",
		 "L","LL",
		 "LV","LY","LΔ","LQ","LK","LKS","LM","LN","LP","LPS","LS","LT","LTR","LTS","LF","LD",
		 "M","MN","MNN",
		 "MV","MVR","MΔ","MZ","MK","MS","MT","MDZ",
		 "N","NN",
		 "NΔ","NΔR","NZ","NQ","NQR","NK","NKS","NS","NST","NT","NTS","NF","NG",
		 "P","PYY","PL","PN","PR","PS","PT",
		 "R",
		 "RV","RVL","RY","RYY","RΔ","RZ","RQ","RQR","RK","RKS","RL","RM","RN","RP","RPS",
		 "RNST","RPR","RPS","RS","RT","RH","RB","RD","RDZ","RG",
		 "S","SQ","SK","SKK","SL","SP","ST","SF","SH",
		 "SKL","SKN","SKR","SPYY","SPL","SPR","STYY","STR","SFR",
		 "SS",
		 "SR",
		 "T","TYY","TM","TR","TS",
		 "TQ","TL","TSS",
		 "F","FQ","FL","FR","FT","FTYY","FHH",
		 "FK","FLL","FN","FS","FST","FH",
		 "H","HQ","HL","HN","HR","HT",
		 "HH",
		 "HNN","HM","HP",
		 "B","BL","BR",
		 "BYY","BN",
		 "D","DR","DZ","DZZ",
		 "DV","DL",
		 "G","GL","GR",
		 "GM","GT","GS","GH","GHR",
		 "GG"};

	private String arSylF[]=//923 elements.
		{"A;α","E;ε","KA;κα","PA;πα","ΔI;δι","SI;συ","PRO;προ","O;ο","I;υ","ME;με","PE;πε","I;ι","PO;πο","KO;κο","MA;μα","QE;θε","TE;τε","AR;αρ","I;η","I;ει","KI;κυ",
		"YE;γε","KI;κοι","EK;εκ","MI;μι","ΔI;δη","TA;τα","NO;νο","FI;φυ","HA;χα","NE;νε","VA;βα","PI;πι","MO;μο","E;αι","KSE;ξε","ΔE;δε","SIM;συμ","SI;ση","MI;μη","YRA;γρα","LA;λα",
		"LE;λε","PLI;πλη","ΔI;δυ","PRO;πρω","FI;φι","I;οι","U;ου","ER;ερ","OR;ορ","VI;βι","FA;φα","TRA;τρα","EN;εν","KE;κε","ΔYYA;δια","SIN;συν","TO;το","FO;φο","LO;λο","STA;στα","SA;σα",
		"KI;κι","TI;τη","ΔO;δο","SO;σο","PI;πη","TI;τυ","MI;μυ","PI;πυ","ΔA;δα","YNO;γνω","PE;παι","TRI;τρι","AN;αν","LI;λι","HRI;χρη","LI;λυ","EM;εμ","QI;θυ","SIG;συγ","KRA;κρα","TRE;τρε",
		"KLI;κλει","KRI;κρυ","O;ω","KU;κου","VO;βο","HO;χω","VU;βου","KAR;καρ","RO;ρο","FE;φε","PU;που","KSI;ξυ","PLU;πλου","SI;σι","SKE;σκε","PLA;πλα","YI;γυ","RA;ρα","YA;γα","RO;ρω","ZO;ζω",
		"STE;στε","FO;φω","LI;λει","HO;χο","PER;περ","BO;μπο","SKO;σκο","SE;σε","SO;σω","BA;μπα","KER;κερ","PSI;ψυ","PI;ποι","TRO;τρο","ZI;ζη","STRA;στρα","SHE;σχε","PRAY;πραγ","AM;αμ","PROS;προσ","RE;ρε",
		"RU;ρου","KO;κω","VE;βε","KE;και","YYA;για","TI;τι","PSI;ψη","ΔI;δει","PI;πει","MAR;μαρ","PLE;πλε","HTI;χτυ","YI;γι","YO;γο","STO;στο","TU;του","VLE;βλε","FE;φαι","PYYA;πια","AF;αυ","QAV;θαυ",
		"NA;να","ΔRA;δρα","AL;αλ","YLO;γλω","FRO;φρο","KRE;κρε","LI;λη","ZE;ζε","HI;χη","MI;μει","HRO;χρο","KLA;κλα","PNEF;πνευ","PNEV;πνευ","PRA;πρα","VRE;βρε","RI;ρι","NI;νοι","QA;θα","LU;λου","MU;μου",
		"KRI;κρι","PSO;ψω","DI;ντυ","FTYYA;φτια","EL;ελ","STI;στη","BE;μπε","SHO;σχο","STI;στοι","RIQ;ρυθ","BER;μπερ","SPU;σπου","YLI;γλι","SKAR;σκαρ","NI;νι","SU;σου","DE;ντε","ΔO;δω","FRA;φρα","ΔU;δου","IN;ιν",
		"NIM;νυμ","BAR;μπαρ","FTAR;φταρ","VI;βη","TSI;τσι","FTA;φτα","QRI;θρη","SFI;σφι","VYYA;βια","PLI;πλυ","HAR;χαρ","NI;νη","RI;ρη","DA;ντα","YU;γου","PO;πω","PSE;ψε","ΔRO;δρο","KLI;κλι","STRI;στρι","VRI;βρι",
		"QRE;θρε","VYA;βγα","VRA;βρα","ZI;ζυ","SFI;σφυ","FTO;φτω","NO;νω","HI;χι","HI;χει","DO;ντο","HE;χαι","MI;μοι","MOR;μορ","TSA;τσα","TER;τερ","NAR;ναρ","SPI;σπι","FU;φου","KIN;κιν","TRO;τρω","FER;φερ",
		"YLI;γλει","FTI;φτυ","VLA;βλα","KAL;καλ","STIY;στιγ","QER;θερ","LEM;λεμ","SPER;σπερ","SPRO;σπρω","DZE;τζε","TOL;τολ","HRI;χρει","KI;κη","QI;θη","KSA;ξα","KI;κει","STI;στει","HE;χε","KRO;κρο","NI;νυ","ZU;ζου",
		"LLA;λια","KLI;κλη","LE;λαι","PSI;ψι","TI;τοι","BI;μπι","KRI;κρη","SER;σερ","TSE;τσε","PRE;πρε","SHI;σχη","DZI;τζι","YER;γερ","PER;παιρ","PRI;πρι","STEL;στελ","TRI;τρυ","EG;εγ","BUR;μπουρ","STAQ;σταθ","DI;ντι",
		"STRE;στρε","TUR;τουρ","LI;λοι","LAM;λαμ","PTO;πτω","SKA;σκα","FRI;φρι","KLE;κλε","KOR;κορ","BU;μπου","YNI;γνη","LAN;λαν","VAQ;βαθ","YRI;γρη","ΔER;δερ","FQO;φθο","VEL;βελ","TIT;τιτ","FRAY;φραγ","YΔI;γδυ","PLE;πλαι",
		"POR;πορ","TEK;τεκ","ME;μαι","SI;σει","ZO;ζο","QI;θει","KON;κων","TO;τω","KSI;ξι","KSI;ξη","NU;νου","KTI;κτι","TI;τει","QO;θω","GA;γκα","PAR;παρ","SPA;σπα","REF;ρευ","KLO;κλο","SAR;σαρ","DU;ντου",
		"SKI;σκη","FAR;φαρ","QRA;θρα","DZA;τζα","STER;στερ","FI;φοι","VRO;βρο","IL;ηλ","MNI;μνη","SFE;σφαι","SKU;σκου","STI;στυ","HRI;χρι","VAR;βαρ","KKU;κιου","KLE;κλαι","MER;μερ","PAN;παν","SAL;σαλ","FRE;φρε","VOL;βολ",
		"VROG;βρογ","YEF;γευ","YYA;γυα","EB;εμπ","KIR;κιρ","KNI;κνη","KOM;κομ","KUL;κουλ","KUR;κουρ","MAL;μαλ","SKOR;σκορ","SPI;σπει","SIB;συμπ","SFIY;σφυγ","TSU;τσου","I;υι","FQA;φθα","FQI;φθι","FIL;φιλ","FLI;φλοι","FRAN;φραν",
		"FRI;φρυ","HAL;χαλ","HER;χερ","HRI;χρυ","HTI;χτι","STI;στι","TE;ται","FI;φη","QI;θι","LO;λω","ZI;ζει","KTI;κτη","QO;θο","PSA;ψα","GO;γκο","FI;φει","KSO;ξο","MO;μω","TAN;ταν","GE;γκε","HI;χυ",
		"PTO;πτο","STRO;στρο","HU;χου","PLO;πλο","VER;βερ","ZVI;σβη","FTI;φτη","FQI;φθει","BI;μπη","GRI;γκρι","PNI;πνι","SIR;συρ","TON;τον","TRU;τρου","FOR;φορ","VI;βυ","GRO;γκρο","BE;μπαι","PLI;πλι","SKLI;σκλη","STRO;στρω",
		"HRE;χρε","ΔRO;δρω","LON;λον","PTI;πτη","SSA;σια","TSSA;τσια","VAN;βαν","GRE;γκρε","BLE;μπλε","BRO;μπρο","PAF;παυ","SKI;σκι","SLA;σλα","SPE;σπε","SPO;σπο","ΔEN;δεν","ΔYYO;διω","IR;ηρ","KLI;κλυ","KRU;κρου","BLO;μπλο",
		"DRA;ντρα","PEM;πεμπ","SPAR;σπαρ","SPON;σπον","FAL;φαλ","FUR;φουρ","HON;χον","HRO;χρω","PSO;ψο","EF;αιφ","VYI;βγη","VΔE;βδε","VUL;βουλ","VUR;βουρ","VREY;βρεγ","VRI;βρει","VRI;βρη","GLA;γκλα","YLI;γλυ","YRI;γρι","ΔIZ;δυσ",
		"EH;εχ","QROM;θρομ","KOL;κολ","MEN;μεν","BEL;μπελ","BLA;μπλα","BUL;μπουλ","BRA;μπρα","BRI;μπρι","BRU;μπρου","PAL;παλ","PLI;πλει","PLIK;πληκ","PLI;πλοι","PUL;πουλ","ROM;ρομ","SLO;σλο","SPI;σπυ","STRU;στρου","SFI;σφη","TAM;ταμ",
		"DZU;τζου","TRE;τραι","FIR;φιρ","FLEY;φλεγ","FON;φον","FUT;φουτ","FRU;φρου","FTYYAY;φτιαγ","HHO;χιο","HOR;χορ","HUR;χουρ","HOR;χωρ","AS;ας","NI;νει","YI;γη","DE;νται","YO;γω","TIS;της","ZME;σμε","TON;των","ZMA;σμα",
		"KKA;κια","ZA;ζα","SAN;σαν","PTI;πτι","KSO;ξω","PSI;ψει","RI;ρυ","RE;ραι","HNO;χνο","ΔES;δες","ZUN;ζουν","OS;ως","DRI;ντρι","ZMI;σμι","VO;βω","QU;θου","KSU;ξου","NUS;νους","STO;στω","KTI;κτυ","BI;μπει",
		"RUS;ρους","MAN;μαν","NE;ναι","LES;λες","LLO;λιο","SFA;σφα","NNA;νια","PTI;πτυ","TAR;ταρ","SQE;σθε","YE;γαι","YIS;γης","ON;ον","TEF;τευ","KAN;καν","GI;γκι","DRE;ντρε","PUR;πουρ","POS;πως","TYYA;τια","TRI;τρη",
		"ZAN;ζαν","MAS;μας","NOR;νορ","DAR;νταρ","SKO;σκω","STU;στου","FTE;φτε","ΔEL;δελ","ΔRI;δρυ","MIN;μην","KSE;ξαι","PTE;πτε","TUS;τους","HNO;χνω","HTI;χτη","YAR;γαρ","ΔIY;δειγ","ΔRI;δρι","MNNA;μια","NNO;νιω","PAS;πας",
		"PNO;πνο","ZMI;σμη","SHA;σχα","TAY;ταγ","DZI;τζη","GLI;γκλι","ΔE;δαι","IS;εις","KLO;κλω","KTE;κτε","NNO;νιο","DER;ντερ","DRO;ντρο","PEN;πεν","PLO;πλω","SAS;σας","SFAL;σφαλ","SFO;σφο","TOR;τορ","TSO;τσο","FHHA;φια",
		"HI;χοι","VYE;βγαι","GER;γκερ","ΔRE;δρε","QHHA;θεια","KNI;κνι","KON;κον","PIS;πεις","PYYO;πιο","PYYA;ποια","PYYO;ποιο","ZVO;σβο","SKRA;σκρα","STAR;σταρ","STON;στον","SFER;σφερ","FQI;φθη","FLE;φλε","FLU;φλου","FOS;φως","HLA;χλα",
		"HNU;χνου","HTA;χτα","HTES;χτες","VYYO;βιο","VLO;βλο","GU;γκου","YLA;γλα","YRE;γρε","YRO;γρο","ΔIS;δεις","QAL;θαλ","QEL;θελ","QES;θες","QNI;θνη","QRAF;θραυ","QRI;θρι","KNO;κνω","KRI;κροι","LOK;λοκ","LOR;λορ","MNNAS;μιας",
		"MIL;μιλ","MUR;μουρ","BERG;μπεργκ","BLI;μπλι","BOL;μπολ","BRE;μπρε","BI;μπυ","MIS;μυς","DOR;ντορ","KSOR;ξορ","PLEY;πλεγ","PYYON;ποιον","PYYOS;ποιος","RUR;ρουρ","SKIR;σκιρ","SKI;σκοι","SKI;σκυ","SLI;σλη","STAL;σταλ","STUS;στους","SFRA;σφρα",
		"DZZA;τζια","TRI;τροι","TSAR;τσαρ","TSSO;τσιο","FAN;φαν","FHHE;φιε","FHHO;φιο","FLER;φλερ","FLI;φλι","FLO;φλω","HQES;χθες","HQO;χθο","HLO;χλο","HRA;χρα","PSAL;ψαλ","EH;αιχ","AK;ακ","ALTS;αλτσ","AD;αντ","ASQ;ασθ","AH;αχ",
		"VAG;βαγκ","VAM;βαμ","VYI;βγει","VYO;βγω","VIL;βιλ","VOM;βομ","VOR;βορ","VRU;βρου","VRUN;βρουν","YYA;γεια","YEN;γεν","YIL;γιλ","YYOR;γιορ","YYOS;γιος","GAL;γκαλ","GAR;γκαρ","GGO;γκιο","GGUR;γκιουρ","GLOB;γκλομπ","GOG;γκογκ","GOL;γκολ",
		"GOLD;γκολντ","GOLF;γκολφ","GRA;γκρα","GRAM;γκραμ","GRAN;γκραν","GRUP;γκρουπ","YLE;γλε","YNA;γνα","YNE;γνε","YOT;γοτ","YRE;γραι","YRU;γρου","YRI;γρυ","ΔAM;δαμ","ΔAF;δαφ","ΔIS;δις","ΔOY;δογ","ΔYYA;δυα","ΔYYO;δυο","IR;ειρ","ED;εντ",
		"EKS;εξ","ERNST;ερνστ","ZIL;ζυλ","QLI;θλι","QRI;θρυ","IY;ιγ","IM;ιμ","KAD;καντ","KARL;καρλ","KVA;κβα","KED;κεντ","KZU;κζου","KIM;κιμ","KKO;κιο","KITS;κιτς","KLAK;κλακ","KLARK;κλαρκ","KLU;κλου","KLIN;κλυν","KNU;κνου","KOG;κογκ",
		"KOK;κοκ","KOD;κοντ","KORN;κορν","KRAH;κραχ","KREM;κρεμ","KRO;κρω","KIR;κυρ","LAR;λαρ","LENG;λενγκ","LIST;λιστ","LLO;λιω","LOM;λομ","LUK;λουκ","LUD;λουντ","LLO;λυω","LOT;λωτ","MAM;μαμ","MAKS;μαξ","MARK;μαρκ","MARKS;μαρξ","MEM;μεμ",
		"MNNAN;μιαν","MIL;μιλλ","MNI;μνει","MOV;μοβ","MON;μον","MORS;μορς","MUM;μουμ","BAL;μπαλ","BEZ;μπεζ","BERN;μπερν","BES;μπες","BIL;μπιλ","BLER;μπλερ","BLOK;μπλοκ","BLUZ;μπλουζ","BOG;μπογκ","BOKS;μποξ","BUK;μπουκ","BUZ;μπουσ","BROS;μπρος","MNNA;μυα",
		"MIR;μυρ","DVOR;ντβορ","DZZO;ντζιω","DIP;ντιπ","DOL;ντολ","DUZ;ντουζ","KSAF;ξαφ","OL;ολ","OM;ομ","PAZL;παζλ","PAM;παμ","PYYI;πιει","PYYES;πιες","PYYO;πιω","PYYES;ποιες","PYYUS;ποιους","POL;πολ","PORT;πορτ","POST;ποστ","PUF;πουφ","PRE;πραι",
		"PRI;πρη","PRIM;πριμ","PRIN;πριν","PROS;προς","PRU;πρου","PRI;πρυ","PTE;πται","PIY;πυγ","PIR;πυρ","POL;πωλ","RID;ρηντ","ROG;ρογ","ROK;ροκ","ROY;ρωγ","SEKS;σαιξ","SAK;σακ","SAKS;σακς","SAM;σαμ","SAF;σαφ","ZVAR;σβαρ","ZVEL;σβελ",
		"ZVER;σβερ","ZVU;σβου","SEN;σεν","SENT;σεντ","SENTS;σεντς","SEKS;σεξ","SEF;σεφ","SIM;σημ","SIY;σιγ","SSU;σιου","SKE;σκαι","SKAN;σκαν","SKKA;σκια","SKKAH;σκιαχ","SKLA;σκλα","SKNI;σκνι","SKON;σκον","SKRI;σκρι","SLE;σλε","ZMAL;σμαλ","ZMER;σμερ",
		"ZMIY;σμηγ","ZMIQ;σμιθ","ZBA;σμπα","ZBI;σμπι","ZMI;σμυ","ZMIR;σμυρ","SUL;σουλ","SUT;σουτ","SPAN;σπαν","SPEN;σπεν","SPI;σπη","SPIN;σπιν","SPYYU;σπιου","SPIR;σπιρ","SPLA;σπλα","SPLI;σπλη","SPLI;σπλι","SPOR;σπορ","SPORT;σπορτ","SPUR;σπουρ","SRI;σρι",
		"STIV;στηβ","STIN;στην","STIL;στιλ","STYYU;στιου","STIS;στις","STOK;στοκ","STOM;στομ","STOP;στοπ","STOR;στορ","STRI;στρει","STRIF;στρυφ","STIL;στυλ","SFEN;σφεν","SFU;σφου","SFRI;σφρι","SHI;σχι","SHI;σχοι","SHOR;σχωρ","TER;ταιρ","TAKT;τακτ","TEST;τεστ",
		"DZAZ;τζαζ","DZAR;τζαρ","DZET;τζετ","DZIM;τζιμ","DZO;τζο","DZON;τζον","DZORDZ;τζορτζ","DZON;τζων","DZORDZ;τζωρτζ","TIK;τηκ","TIN;την","TIK;τικ","TIS;τις","TMI;τμη","TOST;τοστ","TUG;τουγκ","TRIS;τρεις","TSAK;τσακ","TSAH;τσαχ","TSEN;τσεν","TSIR;τσιρ",
		"TSOM;τσομ","TSUR;τσουρ","TSUH;τσουχ","TIM;τυμ","TIR;τυρ","FAKS;φαξ","FAT;φατ","FILM;φιλμ","FIS;φις","FLA;φλα","FLAS;φλας","FLERT;φλερτ","FLO;φλο","FLI;φλυ","FRAG;φραγκ","FRI;φρη","FRID;φριντ","FTE;φται","FTER;φτερ","FTU;φτου","FTYYA;φτυα",
		"FOL;φωλ","HANS;χανς","HAV;χαυ","HAF;χαφ","HEN;χεν","HQE;χθε","HHU;χιου","HHUM;χιουμ","HIT;χιτ","HHO;χιω","HLE;χλαι","HLE;χλε","HLI;χλι","HLO;χλω","HNAR;χναρ","HRI;χροι","HTE;χτε","HOL;χωλ","PSIY;ψηγ","PSIK;ψηκ"};

	private String arSylM[]= //805 elements.
		{"RI;ρι","TI;τι","A;α","ME;με","NI;νι","PO;πο","MA;μα","TA;τα","NA;να","NO;νο","PI;πι","RA;ρα",
		"O;ο","SI;σι","TI;τη","ΔI;δι","LI;λι","LO;λο","MI;μι","TE;τε","NE;νε","O;ω","KO;κο","YI;γι",
		"LE;λε","MO;μο","STI;στι","LA;λα","DI;ντι","KA;κα","PA;πα","QE;θε","YA;γα","I;η","QI;θη","YO;γο",
		"RE;ρε","E;ε","RO;ρο","NI;νη","ΔO;δο","FO;φο","ZO;ζο","STI;στη","TO;το","VA;βα","PE;πε","ΔE;δε",
		"FI;φι","FA;φα","PI;ποι","LI;λυ","RI;ρη","RO;ρω","HA;χα","STA;στα","YRA;γρα","NO;νω","KI;κι","LI;λη",
		"MI;μη","FE;φε","SO;σο","HI;χι","SE;σε","VO;βο","ΔI;δη","KSI;ξι","DA;ντα","YI;γη","FO;φω","QI;θι",
		"NI;νει","STE;στε","HO;χο","LI;λλη","TO;τω","HI;χει","KE;κε","QA;θα","I;ϊ","ΔA;δα","RU;ρου","I;ι",
		"ZME;σμε","SA;σα","LI;λει","KRA;κρα","LU;λου","YI;γει","PI;πη","YO;γω","DO;ντο","KTI;κτι","SO;σω","YU;γου",
		"YE;γε","TI;τυ","KSE;ξε","ZE;ζε","FI;φη","LO;λω","KU;κου","ΔI;δυ","SKE;σκε","KI;κει","QO;θο","FI;φυ",
		"HO;χω","PO;πω","VE;βαι","STO;στο","TRO;τρο","QI;θυ","RI;ρει","ΔI;δει","LA;λλα","ME;μμε","DE;ντε","KTI;κτη",
		"U;ου","NI;νοι","SU;σου","PER;περ","MI;μει","PTI;πτι","VO;υο","VI;βι","PU;που","SI;ση","PI;πει","BO;μπο",
		"TI;τει","KRI;κρι","RI;ρυ","E;αι","KSA;ξα","BE;μπε","RE;ραι","HNO;χνο","MU;μου","TRI;τρι","ΔO;δω","ΔRO;δρο",
		"KE;και","FTO;υτο","QRO;θρω","KI;κη","SI;συ","KSI;ξη","FTI;υτι","PRO;προ","HE;χε","MA;μμα","I;ει","HI;χη",
		"NU;νου","TU;του","KO;κω","VI;βη","FRA;φρα","HE;χαι","LO;λλο","VU;βου","KI;κυ","SKO;σκο","VE;βε","HNI;χνι",
		"UR;ουρ","SO;σσο","HRO;χρο","GO;γκο","NI;νυ","DRI;ντρι","ZMI;σμι","NO;ννο","PE;παι","YNO;γνω","PLA;πλα","KKA;κια",
		"GA;γκα","PAR;παρ","SPA;σπα","AR;αρ","KRO;κρο","ZU;ζου","DI;ντη","STRE;στρε","KSO;ξο","REF;ρευ","BLI;μπλη","VLI;βλη",
		"QO;θω","TRE;τρε","GE;γκε","NER;νερ","KSAR;ξαρ","BA;μπα","KLI;κλη","TUR;τουρ","LE;λαι","VA;υα","QU;θου","KSU;ξου",
		"KTI;κτυ","SQI;σθη","ER;ερ","ZI;ζη","MOR;μορ","MO;μω","BI;μπει","SHI;σχυ","LEK;λεκ","KI;κοι","QI;θει","ZMO;σμο",
		"OR;ορ","YYA;για","SHE;σχε","FI;φει","ZI;ζι","PSI;ψι","HI;χυ","RIQ;ριθ","KEF;κευ","KEV;κευ","ZMA;σμα","KSI;ξυ",
		"KLI;κλει","STRA;στρα","ΔRA;δρα","SHO;σχο","VE;υε","LAM;λαμ","KLO;κλο","STRO;στρο","SFA;σφα","TA;ττα","YNO;γνο","VRO;υρω",
		"ME;μαι","I;οι","PSI;ψη","KSO;ξω","MI;μοι","SKA;σκα","NE;ναι","TAR;ταρ","PTI;πτυ","QE;θαι","FEF;φευ","TE;ται",
		"PSE;ψε","VLE;βλε","NAR;ναρ","LI;λλι","SQE;σθε","I;ϋ","VU;υου","PLI;πλη","PLO;πλο","VER;βερ","SAR;σαρ","ZVI;σβη",
		"TEF;τευ","GE;γγε","YE;γαι","RI;ρρη","GRA;γγρα","GE;γκαι","QNI;θνι","NI;ννοι","RO;ρρω","SI;σσι","SFE;σφε","TRA;τρα",
		"ΔYYA;δια","MI;μυ","ZA;ζα","PSO;ψω","YYA;ια","STI;στοι","TI;τοι","TER;τερ","SPI;σπι","FRI;φρι","FAR;φαρ","SKI;σκη",
		"VLI;βλι","LEG;λεγ","KSER;ξερ","SQA;σθα","KNI;κνυ","MI;μμυ","STRI;στρη","FQE;υθε","VRI;υρι","VRI;υρι","HQI;χθη","EK;εκ",
		"STI;στει","KLA;κλα","PNEV;πνευ","PNEF;πνευ","TSA;τσα","STO;στω","PTO;πτο","HU;χου","LLO;λιο","BI;μπι","BU;μπου","DU;ντου",
		"KLE;κλε","DRE;ντρε","PUR;πουρ","VRO;υρο","TRI;τρη","GI;γγει","GEL;γγελ","GI;γγι","NI;ννη","DRO;ντρω","SE;σσε","FTE;υτε",
		"SIN;συν","KRI;κρυ","KAR;καρ","YI;γυ","FE;φαι","LI;λοι","PTO;πτω","TSI;τσι","KTO;κτο","KIN;κιν","SA;σσα","FTI;φτη",
		"BI;μπη","NOR;νορ","PIR;πηρ","DO;ντω","FTE;υται","NUR;νουρ","KI;κκι","LAM;λλαμ","FQI;υθυ","VRE;υρε","I;υ","PRAY;πραγ",
		"MAR;μαρ","PLE;πλε","PTA;πτα","STRI;στρι","GA;γγα","KTA;κτα","DZA;τζα","SKI;σκει","PSU;ψου","FTE;φτε","GRI;γκρι","PNI;πνι",
		"ΔEL;δελ","KSE;ξαι","ΔRI;δρυ","LAV;λαυ","FQAL;φθαλ","RO;ρρο","VRI;υρη","OR;ωρ","ZO;ζω","KSI;ξει","PLU;πλου","ΔU;δου",
		"AL;αλ","PRA;πρα","DI;ντυ","FU;φου","KLI;κλι","KRI;κρη","VRI;βρι","FER;φερ","YNI;γνη","GI;γκι","DAR;νταρ","SIR;συρ",
		"FOR;φορ","LI;λλει","HNI;χνη","GRO;γκρο","BE;μπαι","SKLI;σκλη","FTI;υτη","PTE;πτε","HTI;χτη","VI;βυ","PLI;πλι","STRO;στρω",
		"HRE;χρε","YAR;γαρ","ΔIY;δειγ","TAY;ταγ","FLI;φλη","NEF;νευ","RIN;ριν","LE;λλε","ΔRI;δρι","NNO;νιω","PNI;πνη","MU;μμου",
		"STE;σται","QAR;θαρ","PNE;πνε","REL;ρελ","REM;ρεμ","ZVA;σβα","SQAN;σθαν","AN;αν","HRI;χρη","PYYA;πια","YLO;γλω","FTYYA;φτια",
		"FTA;φτα","VI;βει","RIQ;ρυθ","QRE;θρε","SER;σερ","TSE;τσε","TRO;τρω","LO;λλω","PRE;πρε","SHI;σχη","STU;στου","SFE;σφαι",
		"DZA;ντζα","ZMI;σμη","NNO;νιο","PEN;πεν","SFAL;σφαλ","SFO;σφο","TOR;τορ","ΔE;δαι","KTU;κτου","MNA;μνα","FTO;φτο","GLI;γκλι",
		"KLO;κλω","KTE;κτε","PLO;πλω","GLI;γγλι","ΔRE;δραι","GO;γγο","MO;μμο","GRU;γκρου","YOR;γορ","QIN;θυν","DAY;νταγ","PEK;πεκ",
		"TIG;τυγ","GI;γγυ","GI;γκυ","YNI;γνυ","LEG;λεγκ","MI;μμι","RA;ρρα","RI;ρρι","SQO;σθω","SSO;σιω","TI;ττι","PSA;ψα",
		"SE;σαι","SIG;συγ","LLA;λια","AM;αμ","VO;βω","PSI;ψυ","PROS;προσ","FRO;φρο","AF;αυ","IN;ιν","EL;ελ","KOR;κορ",
		"QRI;θρη","SFI;σφι","VYA;βγα","ZI;ζυ","SFI;σφυ","YLI;γλει","FTI;φτυ","TRU;τρου","LAN;λαν","DZI;τζι","VAQ;βαθ","ΔER;δερ",
		"VRO;βρο","IL;ηλ","QRO;θρο","LER;λερ","HNA;χνα","SHO;σχω","FQO;φθο","SKU;σκου","SHA;σχα","TSSA;τσια","NAN;ναν","SO;σσω",
		"VI;υη","DZI;τζη","ΔRO;δρω","STI;στυ","GRE;γκρε","BLE;μπλε","BRO;μπρο","PAF;παυ","SLA;σλα","SPE;σπε","SPO;σπο","DER;ντερ",
		"DRO;ντρο","TSO;τσο","FHHA;φια","VYA;υγα","ZVO;σβο","STAR;σταρ","SFER;σφερ","FLU;φλου","HNU;χνου","VYE;βγαι","PYYO;πιο","VΔI;βδη",
		"NNE;νιε","SQU;σθου","VYE;υγε","VYO;υγο","ΔRE;δρε","KNI;κνι","FQI;φθη","VRE;βραι","SPRO;σπρο","YYO;γιω","KLI;κκλη","KRI;κκρι",
		"DI;ντει","YΔE;γδαι","GLO;γκλω","QNO;θνο","LIY;λιγ","LLE;λιε","MIY;μειγ","BYYU;μπιου","BLEY;μπλεγ","BRAY;μπραγ","NAM;ναμ","NIY;νιγ",
		"KSAD;ξαντ","PYYE;πιε","RAR;ραρ","SQO;σθο","SSO;σιο","TAK;ταξ","TMO;τμο","FQE;υθαι","HNEF;χνευ","VΔO;βδο","YLI;γλοι","YNI;γνι",
		"IL;ιλ","YYO;ιω","KRE;κραι","LAY;λλαγ","LAN;λλαν","MO;μμω","MNI;μνι","NA;ννα","NE;ννε","NI;ννι","RI;ρροι","RIN;ρυν",
		"SI;σσυ","VLA;υλα","FTI;υτυ","FI;υφυ","SIM;συμ","PI;πυ","EM;εμ","VO;υω","MAN;μαν","NNA;νια","BER;μπερ","NIM;νυμ",
		"RI;ροι","VYYA;βια","KAN;καν","QRA;θρα","VRA;βρα","FTO;φτω","PLI;πλυ","ΔI;δοι","VLA;βλα","KAL;καλ","STIY;στιγ","STER;στερ",
		"FI;φοι","YER;γερ","STEL;στελ","YRI;γρη","PER;παιρ","LUN;λουν","HNO;χνω","MNI;μνη","PRI;πρι","TRI;τρυ","TIT;τιτ","FRAY;φραγ",
		"LU;λλου","PNO;πνο","SSA;σια","LIN;λιν","LON;λον","PTI;πτη","HRI;χρι","VAR;βαρ","KLE;κλαι","FRE;φρε","FTA;υτα","PAN;παν",
		"YAN;γαν","HNE;χνε","VI;βοι","KRU;κρου","PEM;πεμπ","SPAR;σπαρ","SPON;σπον","FAL;φαλ","FUR;φουρ","FTU;υτου","GER;γκερ","SKRA;σκρα",
		"FLE;φλε","PSO;ψο","DEL;ντελ","PNU;πνου","STYYA;στια","YYO;ιο","PYYA;ποια","PYYO;ποιο","ΔYYO;διω","IR;ηρ","KLI;κλυ","HRO;χρω",
		"VYYO;βιο","VLO;βλο","YLA;γλα","QAL;θαλ","QEL;θελ","QRAF;θραυ","KSOR;ξορ","PLEY;πλεγ","RUR;ρουρ","SKIR;σκιρ","SLI;σλη","STAL;σταλ",
		"SFRA;σφρα","TSAR;τσαρ","FAN;φαν","FHHE;φιε","PSAL;ψαλ","NU;ννου","FQI;υθει","HLI;χλη","ZER;ζερ","KOF;κοφ","PNA;πνα","RER;ρερ",
		"VIN;βιν","LLA;λλια","MI;μμη","TI;ττη","VYI;υγη","VΔO;υδω","VRA;υρα","FTO;υτω","YRE;γρε","QRI;θρι","KNO;κνω","BLI;μπλι",
		"BRE;μπρε","BI;μπυ","SKI;σκοι","GRI;γγρι","ΔRI;δρει","IY;ηγ","KRE;κκρε","KNO;κνο","KTE;κται","BRE;μπραι","DZE;ντζε","DZO;ντζο",
		"SIY;σηγ","SIG;σιγκ","FTAR;υταρ","FIR;φηρ","HRE;χραι","ZE;ζαι","KO;κκο","KTI;κτει","TRI;τρει","FI;υφη","VAL;βαλ","VED;βεντ",
		"VYYE;βιε","VLAR;βλαρ","GLE;γγλε","YΔU;γδου","YYUM;γιουμ","ΔAR;δαρ","ΔRAR;δραρ","IZ;εισ","ZAR;ζαρ","ZEN;ζεν","ZZE;ζιε","QAG;θαγ",
		"QOR;θορ","YYE;ιε","IB;ιμπ","KEM;κεμ","KLAM;κλαμ","KOB;κομπ","KRIN;κρυν","LUR;λλουρ","MNNE;μιε","NAL;ναλ","NADZ;νατζ","NIR;νειρ",
		"NEK;νεκ","NIL;νηλ","DEN;ντεν","NOL;νωλ","KSIL;ξηλ","KSIN;ξυν","OP;οπ","UTS;ουτσ","PAH;παχ","PEL;πελ","POT;ποτ","PTU;πτου",
		"PTIY;πτυγ","RAK;ρακ","RIY;ριγ","RIG;ρρυγ","SORS;σορσ","STAY;σταγ","VΔOR;υδορ","FQOR;υθορ","FQEY;φθεγ","HQU;χθου","HNNE;χνιε","HNNO;χνιο",
		"HNOR;χνορ","HNUR;χνουρ","HTEN;χτεν","PSOR;ψορ","VYI;βγι","VΔI;βδι","VRI;βρυ","YYOR;γιωρ","GI;γκει","YNI;γνοι","QOR;θωρ","KA;κκα",
		"KI;κκυ","KO;κκω","LER;λλερ","LLE;λλιε","LLO;λλιο","LOS;λωσ","BO;μπω","NE;νναι","NNA;ννια","NNU;ννιου","KSEL;ξελ","KSI;ξοι",
		"PNI;πνοι","PYYES;ποιεσ","PO;ππο","POS;πωσ","RE;ρρε","RI;ρρυ","RIQ;ρρυθ","RIN;ρρυν","ZVI;σβι","ZVI;σβυ","SQI;σθι","STIN;στιν",
		"TU;ττου","TO;ττω","VAR;υαρ","VΔE;υδαι","VΔE;υδε","VΔO;υδο","VER;υερ","VLO;υλο","VLI;υλυ","VRI;υρει","FQE;φθε","FTI;φτι",
		"HTO;χτω"};

	private String arSylL[]= //955 elements.
		{"KI;κη","A;α","SI;ση","KO;κο","KA;κα","O;ο","TA;τα","MA;μα","SA;σα","KOS;κος","NA;να",
		"ME;μαι","SI;σει","NOS;νος","NI;νη","DAS;ντας","TE;ται","KIS;κης","ME;με","AS;ας","NO;νω","SE;σε",
		"SIS;σης","RA;ρα","NO;νο","ON;ων","KES;κες","TE;τε","OS;ος","ZMOS;σμος","MUN;μουν","DE;νται","SIS;σεις",
		"TOS;τος","QI;θει","TO;το","ZO;ζω","SO;σω","KON;κων","ΔA;δα","TIS;της","TI;τη","ES;ες","NE;νε",
		"LOS;λος","KU;κου","NES;νες","ROS;ρος","O;ω","NI;νει","TES;τες","LI;λη","U;ου","MOS;μος","ZI;ζει",
		"TON;των","ΔIS;δης","YA;γα","TAS;τας","LO;λο","RO;ρο","NON;νων","LA;λα","MI;μη","NIS;νης","MO;μο",
		"KE;κε","KSI;ξη","ZMU;σμου","NU;νου","KSI;ξει","KI;κι","PSI;ψη","LIS;λης","YO;γω","SAN;σαν","RAS;ρας",
		"NI;νοι","PSI;ψει","SUN;σουν","RO;ρω","RI;ρη","HI;χη","ZMA;σμα","STIS;στης","RI;ρι","VA;βα","I;ει",
		"KSE;ξε","ΔI;δι","ZMO;σμο","STI;στει","NUN;νουν","RES;ρες","NI;νι","ΔES;δες","ZUN;ζουν","LI;λι","YI;γη",
		"ZA;ζα","PSA;ψα","SE;σαι","YOS;γος","NAS;νας","RIS;ρης","RON;ρων","HOS;χος","KSA;ξα","KUS;κους","POS;πος",
		"OS;ως","YI;γει","KI;κοι","DA;ντα","FI;φη","QO;θω","PSE;ψε","VO;υω","STA;στα","STE;στε","RU;ρου",
		"TO;τω","RI;ρει","KKA;κια","KSO;ξω","TI;τι","PI;πη","STO;στο","MU;μου","TAN;ταν","FOS;φος","PA;πα",
		"ZE;ζε","VO;βω","NUS;νους","LI;λει","LLA;λια","RUS;ρους","MIS;μης","PO;πο","FA;φα","PSO;ψω","QUN;θουν",
		"US;ους","STES;στες","I;η","YO;γο","STI;στη","VOS;βος","ΔOS;δος","MON;μων","DOS;ντος","KSIS;ξης","RE;ρε",
		"ΔI;δη","FO;φω","SU;σου","YYA;ια","HIS;χης","ΔO;δο","HA;χα","YE;γε","SO;σο","HO;χω","LU;λου",
		"I;οι","TU;του","MAN;μαν","LES;λες","MES;μες","NIS;νεις","SES;σες","SON;σον","ΔYYA;δια","FI;φει","QIS;θεις",
		"LAS;λας","RUN;ρουν","SOS;σος","STOS;στος","VI;υει","HES;χες","HON;χων","SI;σι","TRO;τρο","DO;ντο","PU;που",
		"TRA;τρα","PO;πω","LA;λλα","KTI;κτη","VI;βη","LI;λοι","STO;στω","VI;βει","NNA;νια","ΔAS;δας","STON;στων",
		"QA;θα","PI;πει","LO;λω","KO;κω","TI;τει","ΔU;δου","YIS;γης","ON;ον","RI;ροι","YES;γες","YON;γων",
		"QOS;θος","KAS;κας","LON;λων","MUS;μους","KSIS;ξεις","RIS;ρεις","ZMUS;σμους","HO;χο","KTO;κτο","YUS;γους","KTIS;κτης",
		"NOS;νως","TUN;τουν","HQI;χθει","HUN;χουν","KI;κει","YYA;για","PTA;πτα","KAN;καν","FQI;φθει","ΔI;δοι","POS;πως",
		"TYYA;τια","YIS;γεις","YUN;γουν","ZIS;ζεις","KTES;κτες","KTOS;κτος","LUS;λους","DAN;νταν","DES;ντες","PIS;πης","PON;πων",
		"RON;ρον","STUN;στουν","PSIS;ψεις","MI;μι","I;ι","FO;φο","QI;θη","HI;χει","MI;μοι","TSA;τσα","PTO;πτω",
		"PTO;πτο","HU;χου","LO;λλω","ZAN;ζαν","MAS;μας","SKO;σκω","KOS;κως","DON;ντων","SQI;σθει","ZMON;σμων","FTI;υτει",
		"HUS;χους","HOS;χως","PSIS;ψης","E;ε","QE;θε","DI;ντι","FI;φι","DE;ντε","VE;βε","ΔO;δω","FTO;υτο",
		"MA;μμα","LO;λλο","DI;ντη","VA;υα","ZI;ζι","VE;υε","IN;ιν","LLO;λιο","KOR;κορ","GA;γγα","QRA;θρα",
		"TON;τον","LUN;λουν","MIN;μην","TUS;τους","YLU;γλου","ΔROS;δρος","ΔON;δων","IS;ης","LIS;λεις","LON;λλον","DIS;ντης",
		"PES;πες","PUN;πουν","PUS;πους","RIS;ρις","SKOS;σκος","SON;σων","VUN;υουν","FES;φες","FTI;φτει","PE;πε","YU;γου",
		"MI;μει","PLA;πλα","AN;αν","HE;χε","GO;γκο","MO;μω","TI;τοι","FU;φου","SA;σσα","KTA;κτα","QRO;θρο",
		"LER;λερ","SHO;σχω","HNA;χνα","HNO;χνω","LIN;λιν","LU;λλου","MNNA;μια","PAS;πας","ZIS;ζης","ZOS;ζος","ZON;ζων",
		"IN;ην","QAN;θαν","QUS;θους","LON;λλων","LOS;λως","NIS;ννης","KSAN;ξαν","UN;ουν","PTES;πτες","PTIS;πτης","ZMI;σμοι",
		"SI;σσει","STAN;σταν","TSIS;τσης","TOS;τως","FIS;φης","HAN;χαν","PI;πι","LE;λε","ΔE;δε","PI;ποι","FE;φε",
		"VO;βο","SKE;σκε","ER;ερ","PER;περ","QO;θο","SKO;σκο","KSI;ξυ","KRO;κρο","GA;γκα","KER;κερ","TER;τερ",
		"PLO;πλο","FTA;φτα","GI;γκι","LI;λλει","STER;στερ","STU;στου","TRU;τρου","FI;φοι","HNI;χνη","NAN;ναν","PNO;πνο",
		"SO;σσω","VI;υη","VI;βοι","YAN;γαν","IS;εις","SAS;σας","FTA;υτα","HNE;χνε","HI;χοι","VAS;βας","VES;βες",
		"YAS;γας","GAS;γκας","YI;γοι","ΔUS;δους","YYES;ιες","KLIS;κλης","KTON;κτων","LIN;λην","LAS;λλας","LOS;λλος","MIS;μεις",
		"PTI;πτει","RAN;ραν","ROS;ρως","SQUN;σθουν","STAS;στας","STOS;στως","SHI;σχει","SOS;σως","TIS;τοις","TRAS;τρας","TROS;τρος",
		"VAN;υαν","FIN;φην","FON;φων","HIS;χεις","HTI;χτει","PSUN;ψουν","I;υ","YI;γι","LI;λυ","AR;αρ","HI;χι",
		"VI;βι","KSI;ξι","PLI;πλη","ΔI;δει","LI;λλη","I;ϊ","ΔRO;δρο","BA;μπα","STRA;στρα","KSO;ξο","STI;στοι",
		"QU;θου","KSU;ξου","PYYA;πια","TSI;τσι","NE;ναι","VER;βερ","KRI;κρη","SER;σερ","TSE;τσε","FTI;φτη","DAR;νταρ",
		"SKI;σκει","PSU;ψου","MNI;μνη","FTI;υτη","LON;λον","DZA;ντζα","PTI;πτη","SSA;σια","SHA;σχα","DZI;τζη","VAN;βαν",
		"SKI;σκι","VYA;υγα","QHHA;θεια","YYO;ιο","KON;κον","DEL;ντελ","PIS;πεις","PNU;πνου","STYYA;στια","STON;στον","FTU;υτου",
		"FOS;φως","HLA;χλα","HTA;χτα","HTES;χτες","VIS;βεις","VEN;βεν","VIS;βης","VID;βιντ","VLOS;βλος","GAS;γγας","GOS;γγος",
		"YIN;γην","GEN;γκεν","GOS;γκος","YOS;γως","ΔYYAS;διας","ΔYYON;διων","ΔRU;δρου","ZES;ζες","QEN;θεν","QIS;θης","QI;θοι",
		"QROS;θρος","QOS;θως","YYAS;ιας","KERT;κερτ","KOS;κκος","KROS;κρος","KTO;κτω","LLAS;λιας","LLU;λιου","LES;λλες","LI;λλοι",
		"LUS;λλους","BAS;μπας","BERT;μπερτ","BUN;μπουν","NNAS;νιας","NIN;νιν","NIS;νις","NON;νον","DUN;ντουν","DRON;ντρων","DOS;ντως",
		"KSOS;ξος","KSUN;ξουν","PLIS;πλης","PLOS;πλος","PLON;πλων","PTOS;πτος","PTUN;πτουν","SEL;σελ","SIN;σιν","SKUN;σκουν","SUS;σους",
		"SAS;σσας","SES;σσες","SUN;σσουν","SHON;σχον","TYYAS;τιας","TYYU;τιου","TRIS;τρης","TRON;τρων","VLOS;υλος","VRES;υρες","VROS;υρος",
		"FTIS;υτης","FTOS;υτος","FTON;υτων","FAS;φας","FQUN;φθουν","FUS;φους","HNES;χνες","HNIS;χνης","HNUN;χνουν","HTUN;χτουν","PSAN;ψαν",
		"SI;συ","ZO;ζο","ΔI;δυ","TI;τυ","KRA;κρα","QI;θι","TRI;τρι","KTI;κτι","VU;βου","EN;εν","ZI;ζη",
		"HRO;χρο","SHE;σχε","KRI;κρυ","HRI;χρη","NI;νυ","PLU;πλου","FTI;υτι","ZU;ζου","KLI;κλη","MOR;μορ","HNI;χνι",
		"TUR;τουρ","AM;αμ","KLA;κλα","NER;νερ","BI;μπει","PRA;πρα","KLO;κλο","DI;ντυ","SHI;σχυ","FRO;φρο","HI;χυ",
		"STRO;στρο","KIN;κιν","TA;ττα","KLI;κλι","LI;λλι","DU;ντου","SPU;σπου","GE;γγε","RI;ρρη","TRO;τρω","VLI;βλι",
		"VRA;βρα","FTO;φτω","VRO;υρο","LAN;λαν","DO;ντω","PIR;πηρ","SIR;συρ","FOR;φορ","FTE;φτε","VRO;βρο","YRI;γρη",
		"IL;ηλ","PTE;πτε","HTI;χτη","VEL;βελ","ΔRO;δρω","LE;λλε","NEF;νευ","RIN;ριν","ZMI;σμη","TSSA;τσια","FLI;φλη",
		"HRI;χρι","KKU;κιου","KTU;κτου","MER;μερ","MNA;μνα","DER;ντερ","DRO;ντρο","SAL;σαλ","TSO;τσο","FHHA;φια","FTO;φτο",
		"VΔI;βδη","GER;γκερ","ΔEN;δεν","BLO;μπλο","NNE;νιε","DRA;ντρα","PYYA;ποια","PYYO;ποιο","SQU;σθου","SKRA;σκρα","VYE;υγε",
		"VYO;υγο","FLE;φλε","HON;χον","VIN;βιν","GU;γκου","YRO;γρο","ΔIS;δεις","ZER;ζερ","QES;θες","QNI;θνη","KOF;κοφ",
		"KRI;κροι","LLA;λλια","LOK;λοκ","LOR;λορ","MNNAS;μιας","MIL;μιλ","MI;μμη","MUR;μουρ","BERG;μπεργκ","BOL;μπολ","MIS;μυς",
		"NU;ννου","DOR;ντορ","PNA;πνα","PYYON;ποιον","PYYOS;ποιος","RER;ρερ","SKI;σκυ","STUS;στους","DZZA;τζια","TRI;τροι","TSSO;τσιο",
		"TI;ττη","VYI;υγη","VΔO;υδω","FQI;υθει","VRA;υρα","FTO;υτω","FHHO;φιο","FLER;φλερ","FLI;φλι","FLO;φλω","HQES;χθες",
		"HQO;χθο","HLI;χλη","HLO;χλο","HRA;χρα","ARS;αρς","ART;αρτ","VARD;βαρντ","VA;ββα","VAS;ββας","VYAS;βγας","VΔIN;βδην",
		"VERK;βερκ","VIN;βην","VIΔ;βιδ","VIS;βις","VITS;βιτς","VIH;βιχ","VONS;βονς","VUN;βουν","VON;βων","VOS;βως","GIS;γγης",
		"GLA;γγλα","GLOS;γγλος","GLU;γγλου","GO;γγω","GON;γγων","YΔI;γδι","YIR;γηρ","YYAS;γιας","YYOL;γιολ","YYON;γιον","GAZ;γκαζ",
		"GAN;γκαν","GELS;γκελς","GES;γκες","GI;γκη","GIS;γκης","GGA;γκια","GLAS;γκλας","GMAR;γκμαρ","GON;γκον","GO;γκω","GON;γκων",
		"YON;γον","ΔAΔ;δαδ","ΔAN;δαν","ΔAKS;δαξ","ΔIN;δην","ΔYYES;διες","ΔYYO;διο","ΔYYI;διοι","ΔYYOS;διος","ΔYYU;διου","ΔYYUS;διους",
		"ΔON;δον","ΔUN;δουν","ΔRAS;δρας","ΔOS;δως","ELS;ελς","EF;εφ","ZAK;ζακ","ZEF;ζεφ","ZZA;ζια","ZI;ζοι","ZUS;ζους",
		"QHHAS;θειας","QHHES;θειες","QHHA;θια","QNES;θνες","QNIS;θνης","QNOS;θνος","QNUS;θνους","QNOS;θνως","QRU;θρου","QON;θων","IQ;ιθ",
		"ILS;ιλς","IMS;ιμς","INS;ινς","YYU;ιου","IP;ιπ","IFT;ιφτ","KIN;κην","KKAS;κιας","KLAD;κλαντ","KLES;κλες","KLOS;κλος",
		"KLUS;κλους","KNIS;κνης","KUN;κουν","KRES;κρες","KRIS;κρυς","KROS;κρως","KSEL;κσελ","KTOR;κτωρ","LLA;λεια","LLES;λειες","LLO;λειο",
		"LEF;λεφ","LLES;λιες","LIZ;λιζ","LLOS;λιος","LLUS;λιους","LIS;λις","LAK;λλακ","LAKS;λλαξ","LIS;λλης","LLON;λλιων","LLOS;λλιως",
		"LOF;λοφ","MAZ;μαζ","MEQ;μεθ","MEL;μελ","MED;μεντ","MIR;μηρ","MIKS;μικς","MNNI;μιοι","MIR;μιρ","MIS;μις","MOD;μοντ",
		"MUQ;μουθ","BAN;μπαν","BAP;μπαπ","BAH;μπαχ","BEK;μπεκ","BIS;μπης","BIDZ;μπιτζ","BLEN;μπλεν","BOT;μποτ","BURG;μπουργκ","BUS;μπους",
		"MOS;μως","NAD;ναντ","NARD;ναρντ","NEQ;νεθ","NET;νετ","NNES;νιες","NIQ;νιθ","NIK;νικ","NNOL;νιολ","NNON;νιον","NNOS;νιος",
		"NITS;νιτς","NNON;νιων","NO;ννω","NOF;νοφ","DAL;νταλ","DAM;νταμ","DERS;ντερς","DZI;ντζη","DIN;ντιν","DOG;ντογκ","DON;ντον",
		"DORF;ντορφ","DRIH;ντριχ","DROS;ντρος","DRU;ντρου","KSSA;ξια","KSOS;ξως","OZ;οζ","ORG;οργκ","PAKS;παξ","PIN;πιν","PIR;πιρ",
		"PLES;πλες","PLOS;πλως","PNES;πνες","PNOS;πνος","PNUN;πνουν","PIS;ποις","PON;πον","PU;ππου","RAT;ρατ","RIK;ρικ","RING;ρινγκ",
		"ROD;ροντ","ROF;ροφ","RIS;ρρης","SIN;σην","SQE;σθαι","SQIS;σθεις","SQOS;σθος","SQUS;σθους","SSOS;σιος","SIS;σις","SKAL;σκαλ",
		"SKIS;σκεις","ZMAN;σμαν","ZMET;σμετ","SI;σοι","SOF;σοφ","SAN;σσαν","SIS;σσης","SON;σσων","STIS;στεις","STYYES;στιες","STIZ;στιζ",
		"STIK;στικ","SHIS;σχεις","SHES;σχες","SHIS;σχυς","SHON;σχων","TYYA;τεια","DZER;τζερ","DZIS;τζης","DZZAS;τζιας","TYYES;τιες","TIN;τιν",
		"TYYON;τιων","TYYA;τοια","TYYO;τοιο","TYYI;τοιοι","TYYON;τοιον","TYYOS;τοιος","TYYUS;τοιους","TOK;τοκ","TRAN;τραν","TRAD;τραντ","TRON;τρον",
		"TRUS;τρους","TSARD;τσαρντ","TSAS;τσας","TSES;τσες","TSEF;τσεφ","TSI;τση","TSIN;τσιν","TI;ττυ","VYES;υγες","VYO;υγω","VΔIS;υδης",
		"VES;υες","VIS;υης","FQO;υθω","VLI;υλη","VLI;υλοι","INS;υνς","ID;υντ","VRAN;υραν","VRU;υρου","FTIN;υτην","FTI;υτοι",
		"FTON;υτον","FTUS;υτους","FIM;φειμ","FIS;φεις","FEN;φεν","FQIN;φθην","FHHAS;φιας","FLLAS;φλιας","FLOS;φλος","FORQ;φορθ","FUN;φουν",
		"FRED;φρεντ","FROS;φρος","FRON;φρων","FTOS;φτος","HAS;χας","HHA;χεια","HHO;χειο","HIN;χην","HQIN;χθην","HQIS;χθης","HQOS;χθος",
		"HQUN;χθουν","HQO;χθω","HHA;χια","HIS;χις","HLUS;χλους","HNAN;χναν","HNAS;χνας","HNI;χνει","HNOS;χνος","HOF;χοφ","HRES;χρες",
		"HRIS;χρις","HROS;χρος","HRU;χρου","HROM;χρωμ","HTIS;χτης","HTO;χτο","HTU;χτου","PSIN;ψιν","OV;ωβ"};

	private String arAefv[]= {"φ","β"};

	private String arM[]= {"μ","μμ"};
	private double arMProb[]= {0.93, 0.07};

	private String arL[]= {"λ","λλ"};
	private double arLProb[]= {0.975, 0.025};

	private String arG[]= {"γκ","γγ"};
	private double arGProb[]= {0.693965517, 0.306034483};

	private String arE[]= {"ε","αι"};
	private double arEProb[]= {0.469025898, 0.530974102};

	private String arI[]= {"ι","η","υ","ει","οι"};
	private double arIProb[]= {0.401535282, 0.313551816, 0.131532329, 0.114038973, 0.0393416};

	private String arO[]= {"ο","ω"};
	private double arOProb[]= {0.739038504, 0.260961496};

 	String s1[]={"",""};//the first the fonal, the second the text.
 	String s2[]={"",""};
 	String s3[]={"",""};
 	String s4[]={"",""};
 	String s5[]={"",""};
 	String s6[]={"",""};
 	String s7[]={"",""};
 	String s8[]={"",""};
 	String sL[]={"",""};


	/**
	 * LastModified:
	 * Created: 2002.02.07
	 * @author nikkas
	 *
	 */
	public void init()
	{
    setLayout(new BorderLayout(5,5));

		//choice row
		Panel panelChoice = new Panel();
    Label labelSyllNumber = new Label("Αριθμός-Συλλαβών:",Label.RIGHT);
    labelSyllNumber.setFont(new Font("TimesRoman", Font.BOLD, 16));
    choiceSyllNumber = new Choice();
    choiceSyllNumber.setFont(new Font("TimesRoman", Font.BOLD, 18));
    choiceSyllNumber.setBackground(Color.white);
		choiceSyllNumber.add("1");
		choiceSyllNumber.add("2");
		choiceSyllNumber.add("3");
		choiceSyllNumber.add("4");
		choiceSyllNumber.add("5");
		choiceSyllNumber.add("6");
		choiceSyllNumber.add("7");
		choiceSyllNumber.add("8");
		choiceSyllNumber.add("9");
		choiceSyllNumber.add("     ");
		choiceSyllNumber.select("4");
    Label labelStress = new Label("Θέση-Τόνου:",Label.RIGHT);
    labelStress.setFont(new Font("TimesRoman", Font.BOLD, 16));
    choiceStress = new Choice();
    choiceStress.setFont(new Font("TimesRoman", Font.BOLD, 16));
    choiceStress.setBackground(Color.white);
		choiceStress.add("Λήγουσα");
		choiceStress.add("Παραλήγουσα");
		choiceStress.add("Προπαραλήγουσα");
		choiceStress.select("Παραλήγουσα");
    Label labelProb = new Label("Πιθανότητες-Συλλαβών:",Label.RIGHT);
    labelProb.setFont(new Font("TimesRoman", Font.BOLD, 16));
    choiceProb = new Choice();
    choiceProb.setFont(new Font("TimesRoman", Font.BOLD, 16));
    choiceProb.setBackground(Color.white);
		choiceProb.add("ίσες");
		choiceProb.add("δείγματος");
		choiceProb.select("δείγματος");
    panelChoice.add(labelSyllNumber);
    panelChoice.add(choiceSyllNumber);
    panelChoice.add(labelStress);
    panelChoice.add(choiceStress);
    panelChoice.add(labelProb);
    panelChoice.add(choiceProb);

		//syllables row
		Panel panelSyll = new Panel();
    Label labelSyllF1 = new Label("Συλλαβή:  Πρώτη:",Label.RIGHT);
    labelSyllF1.setFont(new Font("TimesRoman", Font.BOLD, 16));
    fieldSyllF1 = new TextField(5);
    fieldSyllF1.addActionListener(this);
    fieldSyllF1.setFont(new Font("TimesRoman", Font.BOLD, 16));
    Label labelSyllF2 = new Label("Δεύτερη:",Label.RIGHT);
    labelSyllF2.setFont(new Font("TimesRoman", Font.BOLD, 16));
    fieldSyllF2 = new TextField(5);
    fieldSyllF2.addActionListener(this);
    fieldSyllF2.setFont(new Font("TimesRoman", Font.BOLD, 16));
    Label labelSyllL2 = new Label("Προτελευταία:",Label.RIGHT);
    labelSyllL2.setFont(new Font("TimesRoman", Font.BOLD, 16));
    fieldSyllL2 = new TextField(5);
    fieldSyllL2.addActionListener(this);
    fieldSyllL2.setFont(new Font("TimesRoman", Font.BOLD, 16));
    Label labelSyllL1 = new Label("Τελευταία:",Label.RIGHT);
    labelSyllL1.setFont(new Font("TimesRoman", Font.BOLD, 16));
    fieldSyllL1 = new TextField(5);
    fieldSyllL1.addActionListener(this);
    fieldSyllL1.setFont(new Font("TimesRoman", Font.BOLD, 16));
		panelSyll.add(labelSyllF1);
		panelSyll.add(fieldSyllF1);
		panelSyll.add(labelSyllF2);
		panelSyll.add(fieldSyllF2);
		panelSyll.add(labelSyllL2);
		panelSyll.add(fieldSyllL2);
		panelSyll.add(labelSyllL1);
		panelSyll.add(fieldSyllL1);

		Panel panelParam = new Panel(new BorderLayout());
		panelParam.add("North",panelChoice);
		panelParam.add("South",panelSyll);

		Panel panelButton = new Panel();
    btCreate = new Button(" Δημιούργησε-Λέξη  ");
    btCreate.setFont(new Font("TimesRoman", Font.BOLD, 22));
    btCreate.addActionListener(this);
    panelButton.add(btCreate);

		Panel panelNorth = new Panel(new BorderLayout());
		panelNorth.add("North",panelParam);
		panelNorth.add("South",panelButton);

		Panel panelSouth = new Panel(new BorderLayout(7,7));
    Label labelWord = new Label(" Λ  έ  ξ  η  :",Label.RIGHT);
    labelWord.setFont(new Font("TimesRoman", Font.BOLD, 20));
    fieldWord = new TextField(49);
    fieldWord.setBackground(Color.lightGray);
    fieldWord.setFont(new Font("TimesRoman", Font.BOLD, 24));
    fieldWord.setForeground(Color.blue);
		Panel panelWord = new Panel();
		panelWord.add(labelWord);
		panelWord.add(fieldWord);
    Label labelPron = new Label(" Προφορά :",Label.RIGHT);
    labelPron.setFont(new Font("TimesRoman", Font.BOLD, 20));
    fieldPron = new TextField(59);
    fieldPron.setBackground(Color.lightGray);
    fieldPron.setFont(new Font("TimesRoman", Font.BOLD, 20));
		Panel panelPron = new Panel();
		panelPron.add(labelPron);
		panelPron.add(fieldPron);
		panelSouth.add("North",panelWord);
		panelSouth.add("South",panelPron);

		Panel panelCenter = new Panel(new BorderLayout());
    Label labelMes1 = new Label("Τα σύμβολα φωνημάτων είναι:",Label.CENTER);
    labelMes1.setFont(new Font("TimesRoman", Font.PLAIN, 14));
    Label labelMes2 = new Label("A=α,E=ε,I=ι,O=ο,U=ου,V=β,Y=γ,Δ=δ,Z=ζ,Q=θ,K=κ,L=λ,M=μ,N=ν,P=π,R=ρ,S=σ,T=τ,F=φ,H=χ,B=μπ,D=ντ,G=γκ",Label.CENTER);
    labelMes2.setFont(new Font("TimesRoman", Font.PLAIN, 14));
    Label labelMes3 = new Label("Ο ΤΟΝΟΣ δηλώνεται με το '1' δίπλα στο φωνήεν.  Τα διπλά σύμφωνα δηλώνουν τα 'γιωτικά' όπως στο ρώσσικο 'όχι'.",Label.CENTER);
    labelMes1.setFont(new Font("TimesRoman", Font.PLAIN, 14));
    panelCenter.add("North",labelMes1);
    panelCenter.add("Center",labelMes2);
    panelCenter.add("South",labelMes3);

	  add("North", panelNorth);
		add("South", panelSouth);
		add("Center", panelCenter);
	}

  /**
   * LastModified: 2002.02.16
   * Created: 2002.02.07
   * @author nikkas
   *
   */
  public void actionPerformed(ActionEvent arE)
  {

    if (arE.getSource()==btCreate
    	||arE.getSource()==fieldSyllF1
    	||arE.getSource()==fieldSyllF2
    	||arE.getSource()==fieldSyllL2
    	||arE.getSource()==fieldSyllL1)
    {
			System.out.println("-------------");
	  	s1[0]="";s1[1]="";//the first the fonal, the second the text.
	  	s2[0]="";s2[1]="";
	  	s3[0]="";s3[1]="";
	  	s4[0]="";s4[1]="";
	  	s5[0]="";s5[1]="";
	  	s6[0]="";s6[1]="";
	  	s7[0]="";s7[1]="";
	  	s8[0]="";s8[1]="";
	  	sL[0]="";sL[1]="";

			if (!fieldSyllF1.getText().equals(""))
			{
				if (isLetterEnglish(fieldSyllF1.getText().substring(0,1)) )
					fieldWord.setText("Χρησιμοποίησες ΑΓΓΛΙΚΑ γράμματα στην πρώτη-συλλαβή");
			}
			else if (!fieldSyllF2.getText().equals(""))
			{
				if (isLetterEnglish(fieldSyllF2.getText().substring(0,1)) )
					fieldWord.setText("Χρησιμοποίησες ΑΓΓΛΙΚΑ γράμματα στην δεύτερη-συλλαβή");
			}
			else if (!fieldSyllL2.getText().equals(""))
			{
				if (isLetterEnglish(fieldSyllL2.getText().substring(0,1)) )
					fieldWord.setText("Χρησιμοποίησες ΑΓΓΛΙΚΑ γράμματα στην προτελευταία-συλλαβή");
			}
			else if (!fieldSyllL1.getText().equals(""))
			{
				if (isLetterEnglish(fieldSyllL1.getText().substring(0,1)) )
					fieldWord.setText("Χρησιμοποίησες ΑΓΓΛΙΚΑ γράμματα στην τελευταία-συλλαβή");
			}

	   	if (fieldSyllF1.getText().equals(""))
	   	{
	   		s1=getParts(arSylF[roll(arSylFProb)]);
    		if (s1[1].endsWith("ς")) s1[1]=s1[1].substring(0,s1[1].length()-1)+"σ";
	   	}
	  	else {s1[1]=greekTonosRemove(fieldSyllF1.getText()); s1[0]=getFonSyllable(s1[1]);}

    	if (choiceSyllNumber.getSelectedItem().equals("1"))
    	{
    		//καλόπισμα τελικών συμφώνων:
    		if (s1[1].endsWith("σ")) s1[1]=s1[1].substring(0,s1[1].length()-1)+"ς";
    		else if (s1[1].endsWith("υ")&&s1[0].endsWith("V"))
    			s1[1]=s1[1].substring(0,s1[1].length()-1)+"β";
    		else if (s1[1].endsWith("υ")&&s1[0].endsWith("F"))
    			s1[1]=s1[1].substring(0,s1[1].length()-1)+"φ";
	    	fieldPron.setText(s1[0]);
		    fieldWord.setText(s1[1]);
    	}
    	else if (choiceSyllNumber.getSelectedItem().equals("2"))
    	{
		 		if (fieldSyllL1.getText().equals("")) sL=findNextSyllable(s1,3);
		  	else {
	  			sL[1]=greekTonosRemove(fieldSyllL1.getText());
	  			sL[0]=getFonSyllable(sL[1]);
    			checkSequence(s1,sL);
  		}
    		if (choiceStress.getSelectedItem().equals("Λήγουσα"))
    		{
    			setStress(sL,null);
	    		if (sL[1].endsWith("σ")) sL[1]=sL[1].substring(0,sL[1].length()-1)+"ς";
		    	fieldPron.setText(s1[0] +" - "+sL[0]);
			    fieldWord.setText(s1[1] +sL[1]);
    		}
    		else if (choiceStress.getSelectedItem().equals("Παραλήγουσα"))
   			{
   				setStress(s1,sL);
	    		if (sL[1].endsWith("σ")) sL[1]=sL[1].substring(0,sL[1].length()-1)+"ς";
		    	fieldPron.setText(s1[0] +" - "+sL[0]);
			    fieldWord.setText(s1[1] +sL[1]);
   			}
   			else
    		{
    			fieldPron.setText("");
    			fieldWord.setText("Μόνο η Λήγουσα και η Προπαραλήγουσα τονίζονται.");
    		}
    	}
    	else if (choiceSyllNumber.getSelectedItem().equals("3"))
    	{
    		if (!fieldSyllF2.getText().equals(""))
    		{
    			fieldPron.setText("");
    			fieldWord.setText("ΜΕΣΑΙΑ συλλαβή θεωρώ την 'προτελευταία'");
    		}
    		else
    		{
		    	if (fieldSyllL2.getText().equals("")) s3=findNextSyllable(s1,2);
  		  	else
  		  		{s3[1]=greekTonosRemove(fieldSyllL2.getText()); s3[0]=getFonSyllable(s3[1]);
    				checkSequence(s1,s3);
    			}
			 		if (fieldSyllL1.getText().equals("")) sL=findNextSyllable(s3,3);
			  	else {
	  				sL[1]=greekTonosRemove(fieldSyllL1.getText());
	  				sL[0]=getFonSyllable(sL[1]);
    				checkSequence(s3,sL);
    			}
	    		if (choiceStress.getSelectedItem().equals("Λήγουσα")) setStress(sL,null);
    			else if (choiceStress.getSelectedItem().equals("Παραλήγουσα")) setStress(s3,sL);
    			else setStress(s1,s3);
	    		if (sL[1].endsWith("σ")) sL[1]=sL[1].substring(0,sL[1].length()-1)+"ς";
		    	fieldPron.setText(s1[0] +" - "+s3[0] +" - "+sL[0]);
			    fieldWord.setText(s1[1] +s3[1] +sL[1]);
			  }
	    }

			//*********************************************************************
    	else if (choiceSyllNumber.getSelectedItem().equals("4"))
    	{
    		if (fieldSyllF2.getText().equals("")) s2=findNextSyllable(s1,2);
    		else {
    			s2[1]=greekTonosRemove(fieldSyllF2.getText());	s2[0]=getFonSyllable(s2[1]);
    			checkSequence(s1,s2);
    		}
	    	if (fieldSyllL2.getText().equals("")) s3=findNextSyllable(s2,2);
  	  	else
  	  		{s3[1]=greekTonosRemove(fieldSyllL2.getText()); s3[0]=getFonSyllable(s3[1]);
    			checkSequence(s2,s3);
    		}
		 		if (fieldSyllL1.getText().equals("")) sL=findNextSyllable(s3,3);
		  	else {
	  			sL[1]=greekTonosRemove(fieldSyllL1.getText());
	  			sL[0]=getFonSyllable(sL[1]);
    			checkSequence(s3,sL);
    		}

    		if (choiceStress.getSelectedItem().equals("Λήγουσα")) setStress(sL,null);
    		else if (choiceStress.getSelectedItem().equals("Παραλήγουσα")) setStress(s3,sL);
    		else setStress(s2,s3);
    		if (sL[1].endsWith("σ")) sL[1]=sL[1].substring(0,sL[1].length()-1)+"ς";
	    	fieldPron.setText(s1[0] +" - "+s2[0] +" - "+s3[0] +" - "+sL[0]);
		    fieldWord.setText(s1[1] +s2[1] +s3[1] +sL[1]);
    	}
			//*********************************************************************

    	else if (choiceSyllNumber.getSelectedItem().equals("5"))
    	{
    		if (fieldSyllF2.getText().equals("")) s2=findNextSyllable(s1,2);
    		else {
    			s2[1]=greekTonosRemove(fieldSyllF2.getText());	s2[0]=getFonSyllable(s2[1]);
    			checkSequence(s1,s2);
    		}
    		s3=findNextSyllable(s2,2);
	    	if (fieldSyllL2.getText().equals("")) s4=findNextSyllable(s3,2);
  	  	else
  	  		{s4[1]=greekTonosRemove(fieldSyllL2.getText()); s4[0]=getFonSyllable(s4[1]);
    			checkSequence(s3,s4);
    		}
		 		if (fieldSyllL1.getText().equals("")) sL=findNextSyllable(s4,3);
		  	else {
	  			sL[1]=greekTonosRemove(fieldSyllL1.getText());
	  			sL[0]=getFonSyllable(sL[1]);
    			checkSequence(s4,sL);
    		}
    		if (choiceStress.getSelectedItem().equals("Λήγουσα")) setStress(sL,null);
   			else if (choiceStress.getSelectedItem().equals("Παραλήγουσα")) setStress(s4,sL);
    		else setStress(s3,s4);
    		if (sL[1].endsWith("σ")) sL[1]=sL[1].substring(0,sL[1].length()-1)+"ς";
	    	fieldPron.setText(s1[0] +" - "+s2[0] +" - "+s3[0] +" - "+s4[0] +" - "+sL[0]);
		    fieldWord.setText(s1[1] +s2[1] +s3[1] +s4[1] +sL[1]);
    	}
    	else if (choiceSyllNumber.getSelectedItem().equals("6"))
    	{
    		if (fieldSyllF2.getText().equals("")) s2=findNextSyllable(s1,2);
    		else {
    			s2[1]=greekTonosRemove(fieldSyllF2.getText());	s2[0]=getFonSyllable(s2[1]);
    			checkSequence(s1,s2);
    		}
    		s3=findNextSyllable(s2,2);
    		s4=findNextSyllable(s3,2);
	    	if (fieldSyllL2.getText().equals("")) s5=findNextSyllable(s4,2);
  	  	else
  	  		{s5[1]=greekTonosRemove(fieldSyllL2.getText()); s5[0]=getFonSyllable(s5[1]);
    			checkSequence(s4,s5);
    		}
		 		if (fieldSyllL1.getText().equals("")) sL=findNextSyllable(s5,3);
		  	else {
	  			sL[1]=greekTonosRemove(fieldSyllL1.getText());
	  			sL[0]=getFonSyllable(sL[1]);
    			checkSequence(s5,sL);
    		}
    		if (choiceStress.getSelectedItem().equals("Λήγουσα")) setStress(sL,null);
 	  		else if (choiceStress.getSelectedItem().equals("Παραλήγουσα")) setStress(s5,sL);
    		else setStress(s4,s5);
    		if (sL[1].endsWith("σ")) sL[1]=sL[1].substring(0,sL[1].length()-1)+"ς";
	    	fieldPron.setText(s1[0] +" - "+s2[0] +" - "+s3[0] +" - "+s4[0] +" - "+s5[0] +" - "+sL[0]);
		    fieldWord.setText(s1[1] +s2[1] +s3[1] +s4[1] +s5[1] +sL[1]);
    	}
    	else if (choiceSyllNumber.getSelectedItem().equals("7"))
			{
    		if (fieldSyllF2.getText().equals("")) s2=findNextSyllable(s1,2);
    		else {
    			s2[1]=greekTonosRemove(fieldSyllF2.getText());	s2[0]=getFonSyllable(s2[1]);
    			checkSequence(s1,s2);
    		}
    		s3=findNextSyllable(s2,2);
    		s4=findNextSyllable(s3,2);
    		s5=findNextSyllable(s4,2);
	    	if (fieldSyllL2.getText().equals("")) s6=findNextSyllable(s5,2);
  	  	else
  	  		{s6[1]=greekTonosRemove(fieldSyllL2.getText()); s6[0]=getFonSyllable(s6[1]);
    			checkSequence(s5,s6);
    		}
		 		if (fieldSyllL1.getText().equals("")) sL=findNextSyllable(s6,3);
		  	else {
	  			sL[1]=greekTonosRemove(fieldSyllL1.getText());
	  			sL[0]=getFonSyllable(sL[1]);
    			checkSequence(s6,sL);
    		}
    		if (choiceStress.getSelectedItem().equals("Λήγουσα")) setStress(sL,null);
 	  		else if (choiceStress.getSelectedItem().equals("Παραλήγουσα")) setStress(s6,sL);
    		else setStress(s5,s6);
    		if (sL[1].endsWith("σ")) sL[1]=sL[1].substring(0,sL[1].length()-1)+"ς";
	    	fieldPron.setText(s1[0] +" - "+s2[0] +" - "+s3[0] +" - "+s4[0] +" - "+s5[0]
	    													+" - "+s6[0] +" - "+sL[0]);
		    fieldWord.setText(s1[1] +s2[1] +s3[1] +s4[1] +s5[1] +s6[1] +sL[1]);
    	}
    	else if (choiceSyllNumber.getSelectedItem().equals("8"))
    	{
    		if (fieldSyllF2.getText().equals("")) s2=findNextSyllable(s1,2);
    		else {
    			s2[1]=greekTonosRemove(fieldSyllF2.getText());	s2[0]=getFonSyllable(s2[1]);
    			checkSequence(s1,s2);
    		}
    		s3=findNextSyllable(s2,2);
    		s4=findNextSyllable(s3,2);
    		s5=findNextSyllable(s4,2);
    		s6=findNextSyllable(s5,2);
	    	if (fieldSyllL2.getText().equals("")) s7=findNextSyllable(s6,2);
  	  	else
  	  		{s7[1]=greekTonosRemove(fieldSyllL2.getText()); s7[0]=getFonSyllable(s7[1]);
    			checkSequence(s6,s7);
    		}
		 		if (fieldSyllL1.getText().equals("")) sL=findNextSyllable(s7,3);
		  	else {
	  			sL[1]=greekTonosRemove(fieldSyllL1.getText());
	  			sL[0]=getFonSyllable(sL[1]);
    			checkSequence(s7,sL);
    		}
    		if (choiceStress.getSelectedItem().equals("Λήγουσα")) setStress(sL,null);
 	  		else if (choiceStress.getSelectedItem().equals("Παραλήγουσα")) setStress(s7,sL);
    		else setStress(s6,s7);
    		if (sL[1].endsWith("σ")) sL[1]=sL[1].substring(0,sL[1].length()-1)+"ς";
	    	fieldPron.setText(s1[0] +" - "+s2[0] +" - "+s3[0] +" - "+s4[0] +" - "+s5[0]
	    													+" - "+s6[0] +" - "+s7[0] +" - "+sL[0]);
		    fieldWord.setText(s1[1] +s2[1] +s3[1] +s4[1] +s5[1] +s6[1] +s7[1] +sL[1]);
    	}

    	else if (choiceSyllNumber.getSelectedItem().equals("9"))
    	{
    		if (fieldSyllF2.getText().equals("")) s2=findNextSyllable(s1,2);
    		else {
    			s2[1]=greekTonosRemove(fieldSyllF2.getText());	s2[0]=getFonSyllable(s2[1]);
    			checkSequence(s1,s2);
    		}
    		s3=findNextSyllable(s2,2);
    		s4=findNextSyllable(s3,2);
    		s5=findNextSyllable(s4,2);
    		s6=findNextSyllable(s5,2);
    		s7=findNextSyllable(s6,2);
	    	if (fieldSyllL2.getText().equals("")) s8=findNextSyllable(s7,2);
  	  	else
  	  		{s8[1]=greekTonosRemove(fieldSyllL2.getText()); s8[0]=getFonSyllable(s8[1]);
    			checkSequence(s7,s8);
    		}
		 		if (fieldSyllL1.getText().equals("")) sL=findNextSyllable(s8,3);
		  	else {
	  			sL[1]=greekTonosRemove(fieldSyllL1.getText());
	  			sL[0]=getFonSyllable(sL[1]);
    			checkSequence(s8,sL);
    		}
    		if (choiceStress.getSelectedItem().equals("Λήγουσα")) setStress(sL,null);
 	  		else if (choiceStress.getSelectedItem().equals("Παραλήγουσα")) setStress(s8,sL);
    		else setStress(s7,s6);
    		if (sL[1].endsWith("σ")) sL[1]=sL[1].substring(0,sL[1].length()-1)+"ς";
	    	fieldPron.setText(s1[0] +" - "+s2[0] +" - "+s3[0] +" - "+s4[0] +" - "+s5[0]
	    													+" - "+s6[0] +" - "+s7[0] +" - "+s8[0] +" - "+sL[0]);
		    fieldWord.setText(s1[1] +s2[1] +s3[1] +s4[1] +s5[1] +s6[1] +s7[1] +s8[1] +sL[1]);
    	}
    }//button action.
  }//end actionPerformed.

	/**
	 * LastModified: 2002.02.16
	 * Created: 2002.02.08
	 * @author nikkas
	 *
	 */
	public int roll(double prob[])
	{
//			Random rd = new Random();
//			value=rd.nextInt(501);
		int value=0;
		if (choiceProb.getSelectedItem().equals("ίσες"))
		{
			double p = Math.random();
			double sum = 0;
			for (int i = 0; i < prob.length; i++)
			{
				if (sum < p & p <= sum + (1.0/prob.length)) value = i;
				sum = sum + (1.0/prob.length);
			}
		}
		else
		{
//			Random rd= new Random();
//			if (counter%2==1) p=rd.nextDouble();
			double p = Math.random();
			double sum = 0;
			for (int i = 0; i < prob.length; i++)
			{
				if (sum < p & p <= sum + prob[i]) value = i;
				sum = sum + prob[i];
			}
		}

System.out.println(value +","+s1[0] +","+s2[0] +","+s3[0] +","+sL[0]);
		return value;
	}

//*********************************************************************
// fonal >> text
//*********************************************************************
	/**
	 * LastModified:
	 * Created: 2002.02.08
	 * @author nikkas
	 *
	 * Returns the Grafal-Syllable FROM a Fonal one.
	 */
	public String getGrafSyllable (String fsyll)
	{
		String gp1="",gp2="",gp3="";
		String fclust[]={"","",""};
		fclust=separateFonClusters(fsyll);
		gp1=getGrafCluster(fclust[0]);
		gp2=getGrafCluster(fclust[1]);
		gp3=getGrafCluster(fclust[2]);
		return gp1+gp2+gp3;
	}

	/**
	 * LastModified:
	 * Created: 2002.02.08
	 * @author nikkas
	 *
	 * Returns the 3 parts of a fonal-syllable.
	 */
	public String[] separateFonClusters(String fsyll)
	{
		String fclust[]={"","",""};

		if (fsyll.indexOf("I1")!=-1)
		{
			if (fsyll.startsWith("I1"))
			{
				fclust[1]="I1";
				if (!fsyll.endsWith("I1")) fclust[2]=fsyll.substring(fsyll.indexOf("I1")+2);
			}
			else
			{
				fclust[0]=fsyll.substring(0,fsyll.indexOf("I1"));
				fclust[1]="I1";
				if (!fsyll.endsWith("I1")) fclust[2]=fsyll.substring(fsyll.indexOf("I1")+2);
			}
		}
		else if (fsyll.indexOf("I")!=-1)
		{
			if (fsyll.startsWith("I"))
			{
				fclust[1]="I";
				if (!fsyll.endsWith("I")) fclust[2]=fsyll.substring(fsyll.indexOf("I")+1);
			}
			else
			{
				fclust[0]=fsyll.substring(0,fsyll.indexOf("I"));
				fclust[1]="I";
				if (!fsyll.endsWith("I")) fclust[2]=fsyll.substring(fsyll.indexOf("I")+1);
			}
		}

		else if (fsyll.indexOf("A1")!=-1)
		{
			if (fsyll.startsWith("A1"))
			{
				fclust[1]="A1";
				if (!fsyll.endsWith("A1")) fclust[2]=fsyll.substring(fsyll.indexOf("A1")+2);
			}
			else
			{
				fclust[0]=fsyll.substring(0,fsyll.indexOf("A1"));
				fclust[1]="A1";
				if (!fsyll.endsWith("A1")) fclust[2]=fsyll.substring(fsyll.indexOf("A1")+2);
			}
		}
		else if (fsyll.indexOf("A")!=-1)
		{
			if (fsyll.startsWith("A"))
			{
				fclust[1]="A";
				if (!fsyll.endsWith("A")) fclust[2]=fsyll.substring(fsyll.indexOf("A")+1);
			}
			else
			{
				fclust[0]=fsyll.substring(0,fsyll.indexOf("A"));
				fclust[1]="A";
				if (!fsyll.endsWith("A")) fclust[2]=fsyll.substring(fsyll.indexOf("A")+1);
			}
		}

		else if (fsyll.indexOf("O1")!=-1)
		{
			if (fsyll.startsWith("O1"))
			{
				fclust[1]="O1";
				if (!fsyll.endsWith("O1")) fclust[2]=fsyll.substring(fsyll.indexOf("O1")+2);
			}
			else
			{
				fclust[0]=fsyll.substring(0,fsyll.indexOf("O1"));
				fclust[1]="O1";
				if (!fsyll.endsWith("O1")) fclust[2]=fsyll.substring(fsyll.indexOf("O1")+2);
			}
		}
		else if (fsyll.indexOf("O")!=-1)
		{
			if (fsyll.startsWith("O"))
			{
				fclust[1]="O";
				if (!fsyll.endsWith("O")) fclust[2]=fsyll.substring(fsyll.indexOf("O")+1);
			}
			else
			{
				fclust[0]=fsyll.substring(0,fsyll.indexOf("O"));
				fclust[1]="O";
				if (!fsyll.endsWith("O")) fclust[2]=fsyll.substring(fsyll.indexOf("O")+1);
			}
		}

		else if (fsyll.indexOf("E1")!=-1)
		{
			if (fsyll.startsWith("E1"))
			{
				fclust[1]="E1";
				if (!fsyll.endsWith("E1")) fclust[2]=fsyll.substring(fsyll.indexOf("E1")+2);
			}
			else
			{
				fclust[0]=fsyll.substring(0,fsyll.indexOf("E1"));
				fclust[1]="E1";
				if (!fsyll.endsWith("E1")) fclust[2]=fsyll.substring(fsyll.indexOf("E1")+2);
			}
		}
		else if (fsyll.indexOf("E")!=-1)
		{
			if (fsyll.startsWith("E"))
			{
				fclust[1]="E";
				if (!fsyll.endsWith("E")) fclust[2]=fsyll.substring(fsyll.indexOf("E")+1);
			}
			else
			{
				fclust[0]=fsyll.substring(0,fsyll.indexOf("E"));
				fclust[1]="E";
				if (!fsyll.endsWith("E")) fclust[2]=fsyll.substring(fsyll.indexOf("E")+1);
			}
		}

		else if (fsyll.indexOf("U1")!=-1)
		{
			if (fsyll.startsWith("U1"))
			{
				fclust[1]="U1";
				if (!fsyll.endsWith("U1")) fclust[2]=fsyll.substring(fsyll.indexOf("U1")+2);
			}
			else
			{
				fclust[0]=fsyll.substring(0,fsyll.indexOf("U1"));
				fclust[1]="U1";
				if (!fsyll.endsWith("U1")) fclust[2]=fsyll.substring(fsyll.indexOf("U1")+2);
			}
		}
		else if (fsyll.indexOf("U")!=-1)
		{
			if (fsyll.startsWith("U"))
			{
				fclust[1]="U";
				if (!fsyll.endsWith("U")) fclust[2]=fsyll.substring(fsyll.indexOf("U")+1);
			}
			else
			{
				fclust[0]=fsyll.substring(0,fsyll.indexOf("U"));
				fclust[1]="U";
				if (!fsyll.endsWith("U")) fclust[2]=fsyll.substring(fsyll.indexOf("U")+1);
			}
		}

		return fclust;
	}

	/**
	 * LastModified: 2002.02.12
	 * Created: 2002.02.08
	 * @author nikkas
	 *
	 * Returns the Grafal-Cluster OF a fonal-cluster.
	 */
	public String getGrafCluster (String fc)
	{
		String gc="";
		int i=0;

		//separate the fonal-cluster if there are more than one SOUNDS;
		if (!fc.equals(""))
		{
 			while (i<fc.length())
 			{
 				if (i==fc.indexOf("YY")) {gc=gc+"γι"; i=i+2;}
 				else if (i==fc.indexOf("LL")) {gc=gc+"λι"; i=i+2;}
 				else if (i==fc.indexOf("KK")) {gc=gc+"κι"; i=i+2;}
 				else if (i==fc.indexOf("NN")) {gc=gc+"νι"; i=i+2;}
 				else if (i==fc.indexOf("HH")) {gc=gc+"χι"; i=i+2;}
 				else if (i==fc.indexOf("SS")) {gc=gc+"σι"; i=i+2;}
 				else if (i==fc.indexOf("ZZ")) {gc=gc+"ζι"; i=i+2;}
 				else if (i==fc.indexOf("GG")) {gc=gc+"γκι"; i=i+2;}
 				else if (i==fc.indexOf("KS")) {gc=gc+"ξ"; i=i+2;}
 				else if (i==fc.indexOf("PS")) {gc=gc+"ψ"; i=i+2;}
	  		//τα τονισμένα φωνήεντα είναι 1 κλάστερ.
  			else if (fc.indexOf("A1")!=-1||fc.indexOf("E1")!=-1||fc.indexOf("I1")!=-1||fc.indexOf("O1")!=-1||fc.indexOf("U1")!=-1)
  			{
  				gc=getGrafim(fc);
  				i=i+2;
  			}
	  		else
  			{
  				//δε δεχόμαστε διπλά γράμματα, μετά από άλλο σύμφωνο:
  				String ng=getGrafim(fc.substring(i,i+1) );
  				if (!gc.equals(""))
  					if (ng.startsWith("ββ")
  						||ng.startsWith("κκ")
  						||ng.startsWith("λλ")
  						||ng.startsWith("μμ")
  						||ng.startsWith("νν")
  						||ng.startsWith("ππ")
  						||ng.startsWith("ρρ")
  						||ng.startsWith("σσ")
  						||ng.startsWith("ττ")) ng=ng.substring(1);
  				gc=gc +ng;
  				i=i+1;
  			}
  		}
		}
		return gc;
	}//end getGrafCluster.

	/**
	 * LastModified:
	 * Created: 2002.02.08
	 * @author nikkas
	 *
	 */
	public String getGrafim (String fonim)
	{
		String gm="";
		if (fonim.equals("V")) gm="β";
		else if (fonim.equals("Y")) gm="γ";
		else if (fonim.equals("Δ")) gm="δ";
		else if (fonim.equals("Z")) gm="ζ";
		else if (fonim.equals("Q")) gm="θ";
		else if (fonim.equals("K")) gm="κ";
		else if (fonim.equals("L")) gm="λ";//arL[roll(arLProb)];
		else if (fonim.equals("M")) gm="μ";//arM[roll(arMProb)];
		else if (fonim.equals("N")) gm="ν";
		else if (fonim.equals("P")) gm="π";
		else if (fonim.equals("R")) gm="ρ";
		else if (fonim.equals("S")) gm="σ";
		else if (fonim.equals("T")) gm="τ";
		else if (fonim.equals("F")) gm="φ";
		else if (fonim.equals("H")) gm="χ";
		else if (fonim.equals("B")) gm="μπ";
		else if (fonim.equals("D")) gm="ντ";
		else if (fonim.equals("G")) gm=arG[roll(arGProb)];

		else if (fonim.equals("KK")) gm="κι";
		else if (fonim.equals("GG")) gm="γκι";
		else if (fonim.equals("SS")) gm="σι";
		else if (fonim.equals("ZZ")) gm="ζι";
		else if (fonim.equals("HH")) gm="χι";
		else if (fonim.equals("YY")) gm="γι";
		else if (fonim.equals("LL")) gm="λι";
		else if (fonim.equals("NN")) gm="νι";

		else if (fonim.equals("A1")) gm="ά";
		else if (fonim.equals("E1"))
		{
			gm=arE[roll(arEProb)];
			if (gm.equals("ε")) gm="έ";
			else gm="αί";
		}
		else if (fonim.equals("I1"))
		{
			gm=arI[roll(arIProb)];
			if (gm.equals("η")) gm="ή";
			else if (gm.equals("ι")) gm="ί";
			else if (gm.equals("υ")) gm="ύ";
			else if (gm.equals("ει")) gm="εί";
			else if (gm.equals("οι")) gm="οί";
		}
		else if (fonim.equals("O1"))
		{
			gm=arO[roll(arOProb)];
			if (gm.equals("ο")) gm="ό";
			else gm="ώ";
		}
		else if (fonim.equals("U1")) gm="ού";

		else if (fonim.equals("A")) gm="α";
		else if (fonim.equals("E")) gm=arE[roll(arEProb)];
		else if (fonim.equals("I")) gm=arI[roll(arIProb)];
		else if (fonim.equals("O")) gm=arO[roll(arOProb)];
		else if (fonim.equals("U")) gm="ου";

		else gm="?";

		return gm;
	}//end getGrafim.

//*********************************************************************
// text >> fonal
//*********************************************************************

	/**
	 * LastModified: 2002.02.18
	 * Created: 2002.02.08
	 * @author nikkas
	 *
	 * Returns the Fonal-Syllable FROM a Grafal one.
	 */
	public String getFonSyllable (String gsyll)
	{
		String gclust[]={"","",""};
		gsyll=gsyll.toLowerCase(new Locale("el","GR"));
		gclust=separateGrafClusters(gsyll);
		String fc1=getFonCluster(gclust[0]);
		String fc2=getFonCluster(gclust[1]);
		String fc3=getFonCluster(gclust[02]);
		String fsyll=fc1+fc2+fc3;

		//Αν 1ος και 3ος κλάστερ έχει φωνήεν, κάποιο λάθος έχει γίνει.
		if (fc1.indexOf("A")!=-1||fc1.indexOf("E")!=-1||fc1.indexOf("I")!=-1
				||fc1.indexOf("O")!=-1||fc1.indexOf("U")!=-1)
			{fieldWord.setText("έδωσες λάθος συλλαβή!!!");System.exit(0);}
		if (fc3.indexOf("A")!=-1||fc3.indexOf("E")!=-1||fc3.indexOf("I")!=-1
				||fc3.indexOf("O")!=-1||fc3.indexOf("U")!=-1)
			{fieldWord.setText("έδωσες λάθος συλλαβή!!!");System.exit(0);}

		return fsyll;
	}

	/**
	 * LastModified:
	 * Created: 2002.02.08
	 * @author nikkas
	 *
	 * Returns the 3 parts of a text-syllable.
	 */
	public String[] separateGrafClusters(String gsyll)
	{
		String gclust[]={"","",""};

		//αφαίρεσε τον τόνο
		gsyll=greekTonosRemove(gsyll);

		//Ι+α,ε,ο,ω,ου,οι
		if (gsyll.indexOf("ειου")!=-1||gsyll.indexOf("οιου")!=-1){
			gclust[0]=gsyll.substring(0,gsyll.indexOf("ου"));
			gclust[1]="ου";
			if (!gsyll.endsWith("ου")) gclust[2]=gsyll.substring(gsyll.indexOf("ου")+2);
		}
		else if (gsyll.indexOf("ειοι")!=-1||gsyll.indexOf("οιοι")!=-1){
			gclust[0]=gsyll.substring(0,gsyll.indexOf("οι"));
			gclust[1]="οι";
			if (!gsyll.endsWith("οι")) gclust[2]=gsyll.substring(gsyll.indexOf("οι")+2);
		}
		else if (gsyll.indexOf("εια")!=-1||gsyll.indexOf("οια")!=-1){
			gclust[0]=gsyll.substring(0,gsyll.indexOf("α"));
			gclust[1]="α";
			if (!gsyll.endsWith("α")) gclust[2]=gsyll.substring(gsyll.indexOf("α")+1);
		}
		else if (gsyll.indexOf("ειε")!=-1||gsyll.indexOf("οιε")!=-1){
			gclust[0]=gsyll.substring(0,gsyll.lastIndexOf("ε"));
			gclust[1]="ε";
			if (!gsyll.endsWith("ε")) gclust[2]=gsyll.substring(gsyll.lastIndexOf("ε")+1);
		}
		else if (gsyll.indexOf("ειο")!=-1||gsyll.indexOf("οιο")!=-1){
			gclust[0]=gsyll.substring(0,gsyll.lastIndexOf("ο"));
			gclust[1]="ο";
			if (!gsyll.endsWith("ο")) gclust[2]=gsyll.substring(gsyll.lastIndexOf("ο")+1);
		}
		else if (gsyll.indexOf("ειω")!=-1||gsyll.indexOf("οιω")!=-1){
			gclust[0]=gsyll.substring(0,gsyll.indexOf("ω"));
			gclust[1]="ω";
			if (!gsyll.endsWith("ω")) gclust[2]=gsyll.substring(gsyll.indexOf("ω")+1);
		}

//ια,ιε...
		else if (gsyll.indexOf("ιου")!=-1){
			if (gsyll.startsWith("ιου")){
				gclust[0]="γι";gclust[1]="ου";
				if (!gsyll.endsWith("ου")) gclust[2]=gsyll.substring(gsyll.indexOf("ου")+2);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ου"));
				gclust[1]="ου";
				if (!gsyll.endsWith("ου")) gclust[2]=gsyll.substring(gsyll.indexOf("ου")+2);
			}
		}
		else if (gsyll.indexOf("ιοι")!=-1){
			if (gsyll.startsWith("ιοι")){
				gclust[0]="γι";gclust[1]="οι";
				if (!gsyll.endsWith("οι")) gclust[2]=gsyll.substring(gsyll.indexOf("οι")+2);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("οι"));
				gclust[1]="οι";
				if (!gsyll.endsWith("οι")) gclust[2]=gsyll.substring(gsyll.indexOf("οι")+2);
			}
		}
		else if (gsyll.indexOf("ια")!=-1){
			if (gsyll.startsWith("ια")){
				gclust[0]="γι";gclust[1]="α";
				if (!gsyll.endsWith("α")) gclust[2]=gsyll.substring(gsyll.indexOf("α")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("α"));
				gclust[1]="α";
				if (!gsyll.endsWith("α")) gclust[2]=gsyll.substring(gsyll.indexOf("α")+1);
			}
		}
		else if (gsyll.indexOf("ιε")!=-1){
			if (gsyll.startsWith("ιε")){
				gclust[0]="γι";gclust[1]="ε";
				if (!gsyll.endsWith("ε")) gclust[2]=gsyll.substring(gsyll.indexOf("ε")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ε"));
				gclust[1]="ε";
				if (!gsyll.endsWith("ε")) gclust[2]=gsyll.substring(gsyll.indexOf("ε")+1);
			}
		}
		else if (gsyll.indexOf("ιο")!=-1){
			if (gsyll.startsWith("ιο")){
				gclust[0]="γι";gclust[1]="ο";
				if (!gsyll.endsWith("ο")) gclust[2]=gsyll.substring(gsyll.indexOf("ο")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ο"));
				gclust[1]="ο";
				if (!gsyll.endsWith("ο")) gclust[2]=gsyll.substring(gsyll.indexOf("ο")+1);
			}
		}
		else if (gsyll.indexOf("ιω")!=-1){
			if (gsyll.startsWith("ιω")){
				gclust[0]="γι";gclust[1]="ω";
				if (!gsyll.endsWith("ω")) gclust[2]=gsyll.substring(gsyll.indexOf("ω")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ω"));
				gclust[1]="ω";
				if (!gsyll.endsWith("ω")) gclust[2]=gsyll.substring(gsyll.indexOf("ω")+1);
			}
		}

//γυά-λα,μυα-ά
//υα,υε,...
		else if (gsyll.indexOf("υου")!=-1){
			if (gsyll.startsWith("υου")){
				gclust[0]="β";gclust[1]="ου";
				if (!gsyll.endsWith("ου")) gclust[2]=gsyll.substring(gsyll.indexOf("ου")+2);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ου"));
				gclust[1]="ου";
				if (!gsyll.endsWith("ου")) gclust[2]=gsyll.substring(gsyll.indexOf("ου")+2);
			}
		}
		else if (gsyll.indexOf("υει")!=-1){
			if (gsyll.startsWith("υει")){
				gclust[0]="β";gclust[1]="ει";
				if (!gsyll.endsWith("ει")) gclust[2]=gsyll.substring(gsyll.indexOf("ει")+2);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ει"));
				gclust[1]="ει";
				if (!gsyll.endsWith("ει")) gclust[2]=gsyll.substring(gsyll.indexOf("ει")+2);
			}
		}
		else if (gsyll.indexOf("υοι")!=-1){
			if (gsyll.startsWith("υοι")){
				gclust[0]="β";gclust[1]="οι";
				if (!gsyll.endsWith("οι")) gclust[2]=gsyll.substring(gsyll.indexOf("οι")+2);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("οι"));
				gclust[1]="οι";
				if (!gsyll.endsWith("οι")) gclust[2]=gsyll.substring(gsyll.indexOf("οι")+2);
			}
		}
		else if (gsyll.indexOf("υα")!=-1){
			if (gsyll.startsWith("υα")){
				gclust[0]="β";gclust[1]="α";
				if (!gsyll.endsWith("α")) gclust[2]=gsyll.substring(gsyll.indexOf("α")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("α"));
				gclust[1]="α";
				if (!gsyll.endsWith("α")) gclust[2]=gsyll.substring(gsyll.indexOf("α")+1);
			}
		}
		else if (gsyll.indexOf("υε")!=-1){
			if (gsyll.startsWith("υε")){
				gclust[0]="β";gclust[1]="ε";
				if (!gsyll.endsWith("ε")) gclust[2]=gsyll.substring(gsyll.indexOf("ε")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ε"));
				gclust[1]="ε";
				if (!gsyll.endsWith("ε")) gclust[2]=gsyll.substring(gsyll.indexOf("ε")+1);
			}
		}
		else if (gsyll.indexOf("υο")!=-1){
			if (gsyll.startsWith("υο")){
				gclust[0]="β";gclust[1]="ο";
				if (!gsyll.endsWith("ο")) gclust[2]=gsyll.substring(gsyll.indexOf("ο")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ο"));
				gclust[1]="ο";
				if (!gsyll.endsWith("ο")) gclust[2]=gsyll.substring(gsyll.indexOf("ο")+1);
			}
		}
		else if (gsyll.indexOf("υω")!=-1){
			if (gsyll.startsWith("υω")){
				gclust[0]="β";gclust[1]="ω";
				if (!gsyll.endsWith("ω")) gclust[2]=gsyll.substring(gsyll.indexOf("ω")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ω"));
				gclust[1]="ω";
				if (!gsyll.endsWith("ω")) gclust[2]=gsyll.substring(gsyll.indexOf("ω")+1);
			}
		}
		else if (gsyll.indexOf("υη")!=-1){
			if (gsyll.startsWith("υη")){
				gclust[0]="β";gclust[1]="η";
				if (!gsyll.endsWith("η")) gclust[2]=gsyll.substring(gsyll.indexOf("η")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("η"));
				gclust[1]="η";
				if (!gsyll.endsWith("η")) gclust[2]=gsyll.substring(gsyll.indexOf("η")+1);
			}
		}

//αυ,ευ
		else if (gsyll.indexOf("αυ")!=-1){
			if (gsyll.startsWith("αυ")){
				gclust[1]="α";
				gclust[2]=arAefv[roll(arAefvProb)];
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("αυ"));
				gclust[1]="α";
				gclust[2]=arAefv[roll(arAefvProb)];
			}
		}
		else if (gsyll.indexOf("ευ")!=-1){
			if (gsyll.startsWith("ευ")){
				gclust[1]="ε";
				gclust[2]=arAefv[roll(arAefvProb)];
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ευ"));
				gclust[1]="ε";
				gclust[2]=arAefv[roll(arAefvProb)];
			}
		}

//ει,οι,υι,ου,αι
		else if (gsyll.indexOf("ει")!=-1){
			if (gsyll.startsWith("ει")){
				gclust[1]="ει";
				if (!gsyll.endsWith("ει")) gclust[2]=gsyll.substring(gsyll.indexOf("ει")+2);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ει"));
				gclust[1]="ει";
				if (!gsyll.endsWith("ει")) gclust[2]=gsyll.substring(gsyll.indexOf("ει")+2);
			}
		}
		else if (gsyll.indexOf("οι")!=-1){
			if (gsyll.startsWith("οι")){
				gclust[1]="οι";
				if (!gsyll.endsWith("οι")) gclust[2]=gsyll.substring(gsyll.indexOf("οι")+2);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("οι"));
				gclust[1]="οι";
				if (!gsyll.endsWith("οι")) gclust[2]=gsyll.substring(gsyll.indexOf("οι")+2);
			}
		}
		else if (gsyll.indexOf("υι")!=-1){
			if (gsyll.startsWith("υι")){
				gclust[1]="υι";
				if (!gsyll.endsWith("υι")) gclust[2]=gsyll.substring(gsyll.indexOf("υι")+2);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("υι"));
				gclust[1]="υι";
				if (!gsyll.endsWith("υι")) gclust[2]=gsyll.substring(gsyll.indexOf("υι")+2);
			}
		}
		else if (gsyll.indexOf("ου")!=-1){
			if (gsyll.startsWith("ου")){
				gclust[1]="ου";
				if (!gsyll.endsWith("ου")) gclust[2]=gsyll.substring(gsyll.indexOf("ου")+2);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ου"));
				gclust[1]="ου";
				if (!gsyll.endsWith("ου")) gclust[2]=gsyll.substring(gsyll.indexOf("ου")+2);
			}
		}
		else if (gsyll.indexOf("αι")!=-1){
			if (gsyll.startsWith("αι")){
				gclust[1]="αι";
				if (!gsyll.endsWith("αι")) gclust[2]=gsyll.substring(gsyll.indexOf("αι")+2);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("αι"));
				gclust[1]="αι";
				if (!gsyll.endsWith("αι")) gclust[2]=gsyll.substring(gsyll.indexOf("αι")+2);
			}
		}

//α,ε,ο,ω,η,ι,ϊ
		else if (gsyll.indexOf("α")!=-1){
			if (gsyll.startsWith("α")){
				gclust[1]="α";
				if (!gsyll.endsWith("α")) gclust[2]=gsyll.substring(gsyll.indexOf("α")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("α"));
				gclust[1]="α";
				if (!gsyll.endsWith("α")) gclust[2]=gsyll.substring(gsyll.indexOf("α")+1);
			}
		}
		else if (gsyll.indexOf("ε")!=-1){
			if (gsyll.startsWith("ε")){
				gclust[1]="ε";
				if (!gsyll.endsWith("ε")) gclust[2]=gsyll.substring(gsyll.indexOf("ε")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ε"));
				gclust[1]="ε";
				if (!gsyll.endsWith("ε")) gclust[2]=gsyll.substring(gsyll.indexOf("ε")+1);
			}
		}
		else if (gsyll.indexOf("ο")!=-1){
			if (gsyll.startsWith("ο")){
				gclust[1]="ο";
				if (!gsyll.endsWith("ο")) gclust[2]=gsyll.substring(gsyll.indexOf("ο")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ο"));
				gclust[1]="ο";
				if (!gsyll.endsWith("ο")) gclust[2]=gsyll.substring(gsyll.indexOf("ο")+1);
			}
		}
		else if (gsyll.indexOf("ω")!=-1){
			if (gsyll.startsWith("ω")){
				gclust[1]="ω";
				if (!gsyll.endsWith("ω")) gclust[2]=gsyll.substring(gsyll.indexOf("ω")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ω"));
				gclust[1]="ω";
				if (!gsyll.endsWith("ω")) gclust[2]=gsyll.substring(gsyll.indexOf("ω")+1);
			}
		}
		else if (gsyll.indexOf("η")!=-1){
			if (gsyll.startsWith("η")){
				gclust[1]="η";
				if (!gsyll.endsWith("η")) gclust[2]=gsyll.substring(gsyll.indexOf("η")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("η"));
				gclust[1]="η";
				if (!gsyll.endsWith("η")) gclust[2]=gsyll.substring(gsyll.indexOf("η")+1);
			}
		}
		else if (gsyll.indexOf("ι")!=-1){
			if (gsyll.startsWith("ι")){
				gclust[1]="ι";
				if (!gsyll.endsWith("ι")) gclust[2]=gsyll.substring(gsyll.indexOf("ι")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.indexOf("ι"));
				gclust[1]="ι";
				if (!gsyll.endsWith("ι")) gclust[2]=gsyll.substring(gsyll.indexOf("ι")+1);
			}
		}
		else if (gsyll.indexOf("ϊ")!=-1){
				gclust[1]="ϊ";
				if (!gsyll.endsWith("ϊ")) gclust[2]=gsyll.substring(gsyll.indexOf("ϊ")+1);
		}

//υ,ϋ για τις περιπτώσεις υρυ,υλυ...υνς,υ,
		else if (gsyll.lastIndexOf("υ")!=-1){
			if (gsyll.startsWith("υ") && gsyll.indexOf("υ")==gsyll.lastIndexOf("υ")){
				gclust[1]="υ";
				if (!gsyll.endsWith("υ")) gclust[2]=gsyll.substring(gsyll.lastIndexOf("υ")+1);
			}
			else {
				gclust[0]=gsyll.substring(0,gsyll.lastIndexOf("υ"));
				gclust[1]="υ";
				if (!gsyll.endsWith("υ")) gclust[2]=gsyll.substring(gsyll.lastIndexOf("υ")+1);
			}
		}
		else if (gsyll.indexOf("ϋ")!=-1){//πάντα αρχίζει η συλλαβή με ϋ
			gclust[1]="ϋ";
			if (!gsyll.endsWith("ϋ")) gclust[2]=gsyll.substring(gsyll.lastIndexOf("ϋ")+1);
		}

/*
εγ > εγ-χεί-ρι-ση
ια > κυρ-ια-κή. στην αρχή "γι".
λυω > λυώ-νω,
ρρυγ	ο-ξύ-ρρυγ-χος, γ πριν από χ = γκ.
*/

		return gclust;
	}

	/**
	 * LastModified: 2002.02.12
	 * Created: 2002.02.11
	 * @author nikkas
	 *
	 * input:  a text-cluster (starting, middle, ending)
	 * output: Returns a fonal-cluster.
	 *
	 * note: the gcluster has no stress. 2002.02.12
	 */
	public String getFonCluster (String gclust)
	{
		String fc="";
		int i=0;

		//find the sound of each grafim except some cases:
		if (!gclust.equals(""))
		{
 			while (i<gclust.length())
 			{
			//ειδικές περιπτώσεις:
  			if (i==gclust.indexOf("τζι")) {fc=fc+"DZZ"; i=i+3;}
  			else if (i==gclust.indexOf("τζ")) {fc=fc+"DZ"; i=i+2;}

 			//γιωτικοί ήχοι:
 				else if (i==gclust.indexOf("λλι")) {fc=fc+"LL"; i=i+3;}
 				else if (i==gclust.indexOf("ννι")) {fc=fc+"NN"; i=i+3;}
 				else if (i==gclust.indexOf("γκι")) {fc=fc+"GG"; i=i+3;}
  			else if (i==gclust.indexOf("μπι")) {fc=fc+"BYY"; i=i+3;}
 				else if (i==gclust.indexOf("γει")) {fc=fc+"YY"; i=i+3;}
 				else if (i==gclust.indexOf("γοι")) {fc=fc+"YY"; i=i+3;}
  			else if (i==gclust.indexOf("θει")) {fc=fc+"QHH"; i=i+3;}
  			else if (i==gclust.indexOf("θοι")) {fc=fc+"QHH"; i=i+3;}
	  		else if (i==gclust.indexOf("λει")) {fc=fc="LL"; i=i+3;}
	  		else if (i==gclust.indexOf("λοι")) {fc=fc="LL"; i=i+3;}
  			else if (i==gclust.indexOf("πει")) {fc=fc+"PYY"; i=i+3;}
  			else if (i==gclust.indexOf("ποι")) {fc=fc+"PYY"; i=i+3;}
  			else if (i==gclust.indexOf("τει")) {fc=fc+"TYY"; i=i+3;}
  			else if (i==gclust.indexOf("τοι")) {fc=fc+"TYY"; i=i+3;}
  			else if (i==gclust.indexOf("χει")) {fc=fc+"HH"; i=i+3;}
  			else if (i==gclust.indexOf("χοι")) {fc=fc+"HH"; i=i+3;}

	  		else if (i==gclust.indexOf("βι")) {fc="VYY"; i=i+2;}
 				else if (i==gclust.indexOf("γι")) {fc=fc+"YY"; i=i+2;}
 				else if (i==gclust.indexOf("γυ")) {fc=fc+"YY"; i=i+2;}
  			else if (i==gclust.indexOf("δι")) {fc=fc+"ΔYY"; i=i+2;}
  			else if (i==gclust.indexOf("δυ")) {fc=fc+"ΔYY"; i=i+2;}
  			else if (i==gclust.indexOf("ζι")) {fc=fc+"ZZ"; i=i+2;}
  			else if (i==gclust.indexOf("θι")) {fc=fc+"QHH"; i=i+2;}
 				else if (i==gclust.indexOf("κι")) {fc=fc+"KK"; i=i+2;}
  			else if (i==gclust.indexOf("λι")) {fc=fc+"LL"; i=i+2;}
  			else if (i==gclust.indexOf("λυ")) {fc=fc+"LL"; i=i+2;}
 				else if (i==gclust.indexOf("λι")) {fc=fc+"LL"; i=i+2;}
  			else if (i==gclust.indexOf("μι")) {fc=fc+"MNN"; i=i+2;}
 				else if (i==gclust.indexOf("νι")) {fc=fc+"NN"; i=i+2;}
  			else if (i==gclust.indexOf("ξι")) {fc=fc+"KSS"; i=i+2;}
  			else if (i==gclust.indexOf("πι")) {fc=fc+"PYY"; i=i+2;}
  			else if (i==gclust.indexOf("σι")) {fc=fc+"SS"; i=i+2;}
  			else if (i==gclust.indexOf("τι")) {fc=fc+"TYY"; i=i+2;}
  			else if (i==gclust.indexOf("φι")) {fc=fc+"FHH"; i=i+2;}
  			else if (i==gclust.indexOf("χι")) {fc=fc+"HH"; i=i+2;}

			//υ+σύμφωνο:
  			else if (i==gclust.indexOf("υγ")) {fc=fc+"VY"; i=i+2;}
  			else if (i==gclust.indexOf("υδ")) {fc=fc+"VΔ"; i=i+2;}
  			else if (i==gclust.indexOf("υθ")) {fc=fc+"FQ"; i=i+2;}
  			else if (i==gclust.indexOf("υλ")) {fc=fc+"VL"; i=i+2;}
  			else if (i==gclust.indexOf("υρ")) {fc=fc+"VR"; i=i+2;}
  			else if (i==gclust.indexOf("υσ")) {fc=fc+"FS"; i=i+2;}
  			else if (i==gclust.indexOf("υτ")) {fc=fc+"FT"; i=i+2;}
  			else if (i==gclust.indexOf("υφ")) {fc=fc+"F"; i=i+2;}

 			//δίψηφοι ήχοι:
 				else if (i==gclust.indexOf("γγ")) {fc=fc+"G"; i=i+2;}
 				else if (i==gclust.indexOf("γκ")) {fc=fc+"G"; i=i+2;}
 				else if (i==gclust.indexOf("μπ")) {fc=fc+"B"; i=i+2;}
 				else if (i==gclust.indexOf("ντ")) {fc=fc+"D"; i=i+2;}

			//διπλά γράμματα:
 				else if (i==gclust.indexOf("ββ")) {fc=fc+"V"; i=i+2;}
 				else if (i==gclust.indexOf("κκ")) {fc=fc+"K"; i=i+2;}
 				else if (i==gclust.indexOf("λλ")) {fc=fc+"L"; i=i+2;}
 				else if (i==gclust.indexOf("μμ")) {fc=fc+"M"; i=i+2;}
 				else if (i==gclust.indexOf("νν")) {fc=fc+"N"; i=i+2;}
 				else if (i==gclust.indexOf("ππ")) {fc=fc+"P"; i=i+2;}
 				else if (i==gclust.indexOf("ρρ")) {fc=fc+"R"; i=i+2;}
 				else if (i==gclust.indexOf("σσ")) {fc=fc+"R"; i=i+2;}
 				else if (i==gclust.indexOf("ττ")) {fc=fc+"T"; i=i+2;}

			//δίψηφα φωνήεντα:
				else if (i==gclust.indexOf("ου")) {fc=fc+"U"; i=i+2;}
				else if (i==gclust.indexOf("αι")) {fc=fc+"E"; i=i+2;}
				else if (i==gclust.indexOf("ει")) {fc=fc+"I"; i=i+2;}
				else if (i==gclust.indexOf("οι")) {fc=fc+"I"; i=i+2;}
				else if (i==gclust.indexOf("υι")) {fc=fc+"I"; i=i+2;}

				else
				{
					fc=fc+getFonim(gclust.substring(i,i+1));
					i=i+1;
				}
			}
		}

		return fc;
	}

	/**
	 * LastModified:
	 * Created: 2002.02.11
	 * @author nikkas
	 *
	 */
	public String getFonim (String grafim)
	{
		String fm="";

		if (grafim.equals("κι")||grafim.equals("κκι")) fm="KK";
		else if (grafim.equals("γκι")||grafim.equals("γγι")) fm="GG";
		else if (grafim.equals("σι")) fm="SS";
		else if (grafim.equals("ζι")) fm="ZZ";
		else if (grafim.equals("χι")) fm="XX";
		else if (grafim.equals("γι")) fm="YY";
		else if (grafim.equals("λι")||grafim.equals("λλι")) fm="LL";
		else if (grafim.equals("νι")||grafim.equals("ννι")) fm="NN";

		else if (grafim.equals("μπ")) fm="B";
		else if (grafim.equals("ντ")) fm="D";
		else if (grafim.equals("γκ")) fm="G";

		else if (grafim.equals("β")||grafim.equals("ββ")) fm="V";
		else if (grafim.equals("γ")) fm="Y";
		else if (grafim.equals("δ")) fm="Δ";
		else if (grafim.equals("ζ")) fm="Z";
		else if (grafim.equals("θ")) fm="Q";
		else if (grafim.equals("κ")||grafim.equals("κκ")) fm="K";
		else if (grafim.equals("λ")||grafim.equals("λλ")) fm="L";
		else if (grafim.equals("μ")||grafim.equals("μμ")) fm="M";
		else if (grafim.equals("ν")||grafim.equals("νν")) fm="N";
		else if (grafim.equals("π")) fm="P";
		else if (grafim.equals("ρ")||grafim.equals("ρρ")) fm="R";
		else if (grafim.equals("σ")||grafim.equals("σσ")||grafim.equals("ς")) fm="S";
		else if (grafim.equals("τ")||grafim.equals("ττ")) fm="T";
		else if (grafim.equals("φ")) fm="F";
		else if (grafim.equals("χ")) fm="H";
		else if (grafim.equals("ξ")) fm="KS";
		else if (grafim.equals("ψ")) fm="PS";

		else if (grafim.equals("ού")) fm="U1";
		else if (grafim.equals("αί")) fm="E1";
		else if (grafim.equals("εί")) fm="I1";
		else if (grafim.equals("οί")) fm="I1";
		else if (grafim.equals("έ")) fm="E1";
		else if (grafim.equals("ή")) fm="I1";
		else if (grafim.equals("ί")) fm="I1";
		else if (grafim.equals("ΐ")) fm="I1";
		else if (grafim.equals("ύ")) fm="I1";
		else if (grafim.equals("ΰ")) fm="I1";
		else if (grafim.equals("ό")) fm="O1";
		else if (grafim.equals("ώ")) fm="O1";
		else if (grafim.equals("ά")) fm="A1";

		else if (grafim.equals("ου")) fm="U";
		else if (grafim.equals("αι")) fm="E";
		else if (grafim.equals("ει")) fm="I";
		else if (grafim.equals("οι")) fm="I";
		else if (grafim.equals("ε")) fm="E";
		else if (grafim.equals("η")) fm="I";
		else if (grafim.equals("ι")) fm="I";
		else if (grafim.equals("ϊ")) fm="I";
		else if (grafim.equals("υ")) fm="I";
		else if (grafim.equals("ϋ")) fm="I";
		else if (grafim.equals("ο")) fm="O";
		else if (grafim.equals("ω")) fm="O";
		else if (grafim.equals("α")) fm="A";

		else fm="?";

		return fm;
	}

//*********************************************************************
//MISC
//*********************************************************************

	/**
	 * LastModified:
	 * Created: 2002.02.16
	 * @author nikkas
	 *
	 * input: syl	Η συλλαβή που θα τονίσουμε.
	 *				ss	Η συλλαβή μετά την τονιζόμενη που ίσως επηρεαστεί.
	 */
	public void setStress(String syl[], String ss[])
	{
		syl[0]=setStressOnFonal(syl[0]);
		syl[1]=setStressOnGrafal(syl[1]);

		//αν η επόμενη συλλαβή είναι "ϊ", ΤΟΤΕ πρέπει να φύγουν τα διαλυτικά.
		if (ss!=null)
		{
			if (ss[1].equals("ϊ")) ss[1]="ι";
			else if (ss[1].equals("ϋ")) ss[1]="υ";
		}
	}//end setStress

	/**
	 * LastModified:
	 * Created: 2002.02.09
	 * @author nikkas
	 *
	 */
	public String setStressOnFonal(String syl)
	{
		if (syl.indexOf("A")!=-1) syl=syl.substring(0, syl.indexOf("A"))+"A1"+syl.substring(syl.indexOf("A")+1,syl.length());
		else if (syl.indexOf("E")!=-1) syl=syl.substring(0, syl.indexOf("E"))+"E1"+syl.substring(syl.indexOf("E")+1,syl.length());
		else if (syl.indexOf("I")!=-1) syl=syl.substring(0, syl.indexOf("I"))+"I1"+syl.substring(syl.indexOf("I")+1,syl.length());
		else if (syl.indexOf("O")!=-1) syl=syl.substring(0, syl.indexOf("O"))+"O1"+syl.substring(syl.indexOf("O")+1,syl.length());
		else if (syl.indexOf("U")!=-1) syl=syl.substring(0, syl.indexOf("U"))+"U1"+syl.substring(syl.indexOf("U")+1,syl.length());
		return syl;
	}

	/**
	 * LastModified: 2002.02.12
	 * Created: 2002.02.04
	 * @author nikkas
	 *
	 * input: gsyl Η συλλαβή που θα τονίσουμε.
	 */
	public String setStressOnGrafal(String gsyl)
	{
		if (gsyl.indexOf("ειου")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ειου"))+"ειού"+gsyl.substring(gsyl.indexOf("ειου")+4);
		else if (gsyl.indexOf("ειαι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ειαι"))+"ειαί"+gsyl.substring(gsyl.indexOf("ειαι")+4);
		else if (gsyl.indexOf("ειει")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ειει"))+"ειεί"+gsyl.substring(gsyl.indexOf("ειει")+4);
		else if (gsyl.indexOf("ειοι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ειοι"))+"ειοί"+gsyl.substring(gsyl.indexOf("ειοι")+4);
		else if (gsyl.indexOf("εια")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("εια"))+"ειά"+gsyl.substring(gsyl.indexOf("εια")+3);
		else if (gsyl.indexOf("ειε")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ειε"))+"ειέ"+gsyl.substring(gsyl.indexOf("ειε")+3);
		else if (gsyl.indexOf("ειη")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ειη"))+"ειή"+gsyl.substring(gsyl.indexOf("ειη")+3);
		else if (gsyl.indexOf("ειι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ειι"))+"ειί"+gsyl.substring(gsyl.indexOf("ειι")+3);
		else if (gsyl.indexOf("ειυ")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ειυ"))+"ειύ"+gsyl.substring(gsyl.indexOf("ειυ")+3);
		else if (gsyl.indexOf("ειο")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ειο"))+"ειό"+gsyl.substring(gsyl.indexOf("ειο")+3);
		else if (gsyl.indexOf("ειω")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ειω"))+"ειώ"+gsyl.substring(gsyl.indexOf("ειω")+3);

		else if (gsyl.indexOf("οιου")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("οιου"))+"οιού"+gsyl.substring(gsyl.indexOf("οιου")+4);
		else if (gsyl.indexOf("οιαι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("οιαι"))+"οιαί"+gsyl.substring(gsyl.indexOf("οιαι")+4);
		else if (gsyl.indexOf("οιει")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("οιει"))+"οιεί"+gsyl.substring(gsyl.indexOf("οιει")+4);
		else if (gsyl.indexOf("οιοι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("οιοι"))+"οιοί"+gsyl.substring(gsyl.indexOf("οιοι")+4);
		else if (gsyl.indexOf("οια")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("οια"))+"οιά"+gsyl.substring(gsyl.indexOf("οια")+3);
		else if (gsyl.indexOf("οιε")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("οιε"))+"οιέ"+gsyl.substring(gsyl.indexOf("οιε")+3);
		else if (gsyl.indexOf("οιη")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("οιη"))+"οιή"+gsyl.substring(gsyl.indexOf("οιη")+3);
		else if (gsyl.indexOf("οιι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("οιι"))+"οιί"+gsyl.substring(gsyl.indexOf("οιι")+3);
		else if (gsyl.indexOf("οιυ")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("οιυ"))+"οιύ"+gsyl.substring(gsyl.indexOf("οιυ")+3);
		else if (gsyl.indexOf("οιο")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("οιο"))+"οιό"+gsyl.substring(gsyl.indexOf("οιο")+3);
		else if (gsyl.indexOf("οιω")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("οιω"))+"οιώ"+gsyl.substring(gsyl.indexOf("οιω")+3);

		else if (gsyl.indexOf("ιου")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ιου"))+"ιού"+gsyl.substring(gsyl.indexOf("ιου")+3);
		else if (gsyl.indexOf("ιαι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ιαι"))+"ιαί"+gsyl.substring(gsyl.indexOf("ιαι")+3);
		else if (gsyl.indexOf("ιει")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ιει"))+"ιεί"+gsyl.substring(gsyl.indexOf("ιει")+3);
		else if (gsyl.indexOf("ιοι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ιοι"))+"ιοί"+gsyl.substring(gsyl.indexOf("ιοι")+3);
		else if (gsyl.indexOf("ια")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ια"))+"ιά"+gsyl.substring(gsyl.indexOf("ια")+2);
		else if (gsyl.indexOf("ιε")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ιε"))+"ιέ"+gsyl.substring(gsyl.indexOf("ιε")+2);
		else if (gsyl.indexOf("ιη")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ιη"))+"ιή"+gsyl.substring(gsyl.indexOf("ιη")+2);
		else if (gsyl.indexOf("ιι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ιι"))+"ιί"+gsyl.substring(gsyl.indexOf("ιι")+2);
		else if (gsyl.indexOf("ιυ")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ιυ"))+"ιύ"+gsyl.substring(gsyl.indexOf("ιυ")+2);
		else if (gsyl.indexOf("ιο")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ιο"))+"ιό"+gsyl.substring(gsyl.indexOf("ιο")+2);
		else if (gsyl.indexOf("ιω")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ιω"))+"ιώ"+gsyl.substring(gsyl.indexOf("ιω")+2);

		else if (gsyl.indexOf("υου")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("υου"))+"υού"+gsyl.substring(gsyl.indexOf("υου")+3);
		else if (gsyl.indexOf("υαι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("υαι"))+"υαί"+gsyl.substring(gsyl.indexOf("υαι")+3);
		else if (gsyl.indexOf("υει")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("υει"))+"υεί"+gsyl.substring(gsyl.indexOf("υει")+3);
		else if (gsyl.indexOf("υοι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("υοι"))+"υοί"+gsyl.substring(gsyl.indexOf("υοι")+3);
		else if (gsyl.indexOf("υα")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("υα"))+"υά"+gsyl.substring(gsyl.indexOf("υα")+2);
		else if (gsyl.indexOf("υε")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("υε"))+"υέ"+gsyl.substring(gsyl.indexOf("υε")+2);
		else if (gsyl.indexOf("υη")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("υη"))+"υή"+gsyl.substring(gsyl.indexOf("υη")+2);
		else if (gsyl.indexOf("υι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("υι"))+"υί"+gsyl.substring(gsyl.indexOf("υι")+2);
		else if (gsyl.indexOf("υυ")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("υυ"))+"υύ"+gsyl.substring(gsyl.indexOf("υυ")+2);
		else if (gsyl.indexOf("υο")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("υο"))+"υό"+gsyl.substring(gsyl.indexOf("υο")+2);
		else if (gsyl.indexOf("υω")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("υω"))+"υώ"+gsyl.substring(gsyl.indexOf("υω")+2);
//"-υα-" σαν αυτόνομη συλλαβή, και όχι με συμφωνο μπροστά (γυα-λα), έχει 2 περιπτώσεις:
//α) υά (κα-τα-σκε-υά-ζω) και β) ύα (κα-τα-σκε-ύα-σα).

		else if (gsyl.indexOf("αυ")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("αυ"))+"αύ"+gsyl.substring(gsyl.indexOf("αυ")+2);
		else if (gsyl.indexOf("ευ")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ευ"))+"εύ"+gsyl.substring(gsyl.indexOf("ευ")+2);
		else if (gsyl.indexOf("αι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("αι"))+"αί"+gsyl.substring(gsyl.indexOf("αι")+2);
		else if (gsyl.indexOf("ου")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ου"))+"ού"+gsyl.substring(gsyl.indexOf("ου")+2);
		else if (gsyl.indexOf("ει")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ει"))+"εί"+gsyl.substring(gsyl.indexOf("ει")+2);
		else if (gsyl.indexOf("οι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("οι"))+"οί"+gsyl.substring(gsyl.indexOf("οι")+2);
		else if (gsyl.indexOf("υι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("υι"))+"υί"+gsyl.substring(gsyl.indexOf("υι")+2);
		else if (gsyl.indexOf("ϊ")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ϊ"))+"ΐ"+gsyl.substring(gsyl.indexOf("ϊ")+1);
		else if (gsyl.indexOf("ϋ")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ϋ"))+"ΰ"+gsyl.substring(gsyl.indexOf("ϋ")+1);

		else if (gsyl.indexOf("α")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("α"))+"ά"+gsyl.substring(gsyl.indexOf("α")+1);
		else if (gsyl.indexOf("ε")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ε"))+"έ"+gsyl.substring(gsyl.indexOf("ε")+1);
		else if (gsyl.indexOf("η")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("η"))+"ή"+gsyl.substring(gsyl.indexOf("η")+1);
		else if (gsyl.indexOf("ι")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ι"))+"ί"+gsyl.substring(gsyl.indexOf("ι")+1);
		else if (gsyl.indexOf("ο")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ο"))+"ό"+gsyl.substring(gsyl.indexOf("ο")+1);
		else if (gsyl.indexOf("ω")!=-1) gsyl=gsyl.substring(0, gsyl.indexOf("ω"))+"ώ"+gsyl.substring(gsyl.indexOf("ω")+1);

		//υφυ >> υφύ
		else if (gsyl.lastIndexOf("υ")!=-1) gsyl=gsyl.substring(0, gsyl.lastIndexOf("υ"))+"ύ"+gsyl.substring(gsyl.lastIndexOf("υ")+1);

		return gsyl;
	}

	/**
	 * LastModified: 2002.02.16
	 * Created: 2001.03.11
	 * @author nikkas
	 *
	 */
	public String greekTonosRemove(String word)
	{
		//πρώτα μετέτρεψε τη συλλαβή σε μικρά γράμματα.
		word=word.toLowerCase(new Locale("el","GR"));
		if (word.indexOf("ά")!=-1)
			return word.replace('ά','α');
		else if (word.indexOf("έ")!=-1)
			return word.replace('έ','ε');
		else if (word.indexOf("ή")!=-1)
			return word.replace('ή','η');
		else if (word.indexOf("ί")!=-1)  // \u03af")!=-1)
			return word.replace('\u03af','ι');
		else if (word.indexOf("ό")!=-1)
			return word.replace('ό','ο');
		else if (word.indexOf("ύ")!=-1)
			return word.replace('ύ','υ');
		else if (word.indexOf("ώ")!=-1)
			return word.replace('ώ','ω');
		else if (word.indexOf("ΰ")!=-1)
			return word.replace('ΰ','ϋ');
		else if (word.indexOf("ΐ")!=-1)
			return word.replace('ΐ','ϊ');
		else
			return word;
	}//greekTonosRemove.


	/**
	 * LastModified:
	 * Created: 2002.02.14
	 * @author nikkas
	 *
	 */
	public boolean isVowelFonal(char c)
	{
		if (c=='A' ||
				c=='E' ||
				c=='I' ||
				c=='O' ||
				c=='U' )
			return true;
		else
			return false;
	}//isVowelFonal.

	/**
	 * LastModified:
	 * Created: 2002.02.14
	 * @author nikkas
	 *
	 */
	public boolean isArrayElement(String s, String[] ar)
	{
		for (int i=0; i<ar.length; i++)
		{
			if (ar[i].equals(s)) return true;
		}
		return false;
	}

	/**
	 * LastModified:
	 * Created: 2002.02.16
	 * @author nikkas
	 *
	 */
	public boolean isLetterEnglish(String s)
	{
		s=s.toLowerCase();
		if (s.equals("a")||
				s.equals("b")||
				s.equals("c")||
				s.equals("d")||
				s.equals("e")||
				s.equals("f")||
				s.equals("g")||
				s.equals("h")||
				s.equals("i")||
				s.equals("j")||
				s.equals("k")||
				s.equals("l")||
				s.equals("m")||
				s.equals("n")||
				s.equals("o")||
				s.equals("p")||
				s.equals("q")||
				s.equals("r")||
				s.equals("s")||
				s.equals("t")||
				s.equals("u")||
				s.equals("v")||
				s.equals("w")||
				s.equals("x")||
				s.equals("y")||
				s.equals("z") )
			return true;
		else
			return false;
	}//isLetterEnglish

	/**
	 * LastModified:
	 * Created: 2002.02.16
	 * @author nikkas
	 *
	 */
	public String[] peakSyllable(int j)
	{
		String ss[]={"",""};
		if (j==1) ss=getParts(arSylF[roll(arSylFProb)]);
		else if (j==2) ss=getParts(arSylM[roll(arSylMProb)]);
		else if (j==3) ss=getParts(arSylL[roll(arSylLProb)]);
		return ss;
	}

	/**
	 * LastModified:
	 * Created: 2002.02.13
	 * @author nikkas
	 *
	 * input: the parts of a syllable as "fonal;text".
	 * output {fonal,text}.
	 */
	public String[] getParts(String sl)
	{
		String[] s={"",""};
		s[0]=sl.substring(0,sl.indexOf(";"));
	  s[1]=sl.substring(sl.indexOf(";")+1);
	  return s;
	}

//*********************************************************************
// SYLLABLE - SEQUENCE
//*********************************************************************

	/**
	 * LastModified: 2002.02.17
	 * Created: 2002.02.13
	 * @author nikkas
	 *
	 * input: An array with the first-syllable. The integer shows from which array
	 *				to find the next syllable: 1=first, 2=middle, 3=last.
	 * output: the new syllable.
	 */
	public String[] findNextSyllable(String[] fs, int j)
	{
		String[] ss={"",""};//the next-syllable.
		ss=peakSyllable(j);
		int counter=0;//stop if the program can not find one.

		//επανέλαβε μεχρι να βρεις συλλαβή που ταιριάζει και δώσε αποτέλεσμα:

		//ΕΑΝ προηγ-συλ τελειώνει σε υ/φ,
		//ΤΟΤΕ η επόμενη πρέπει να αρχίζει από //θ,κ,ξ,σ,τ,π,x
		while (fs[0].endsWith("F") && fs[1].endsWith("υ") )
		{
			counter ++;
			if (ss[0].startsWith("Q")||ss[0].startsWith("K")||ss[0].startsWith("S")
					||ss[0].startsWith("T")||ss[0].startsWith("P")||ss[0].startsWith("H") )
			{
				if (ss[1].charAt(0)!=ss[1].charAt(1))	return ss;
				else {if (counter<259) ss=peakSyllable(j); else {ss[0]="TA";ss[1]="τα"; return ss;}}
			}
			else {if (counter<259) ss=peakSyllable(j); else {ss[0]="TA";ss[1]="τα"; return ss;}}
		}
		//ΑΝ προηγ-συλ τελειώνει σε υ/β,
		//ΤΟΤΕ η επόμενη πρέπει να ΜΗΝ αρχίζει από //θ,κ,ξ,σ,τ,π,x
		while (fs[0].endsWith("V") && fs[1].endsWith("υ") )
		{
			//δέχεται: μόνο μ,ν. Τα υπόλοιπα μαζί με β δημιουργούν συλλαβή β,γ,δ,λ,μ,ν,ρ και τα φωνήεντα.
			if (ss[0].startsWith("M") || ss[0].startsWith("N") )
				if (ss[1].charAt(0)!=ss[1].charAt(1))	return ss;
				else ss=peakSyllable(j);
			else ss=peakSyllable(j);
		}

		//ΑΝ η πσ τελειώνει σε G;γ ΤΟΤΕ η δσ πρέπει να έχει πρώτο-μέρος χ ή χρ.
		counter=0;
		while (fs[0].endsWith("G") && fs[1].endsWith("γ") )
		{
			counter ++;
			String s1p[]=separateFonClusters(ss[0]);
			if (s1p[0].equals("HR")||s1p[0].equals("H")) return ss;
			else {if (counter<259) ss=peakSyllable(j); else {ss[0]="HO";ss[1]="χω"; return ss;}}
		}

		//ΕΠΙΤΡΕΠΤΕΣ ΑΚΟΛΟΥΘΙΕΣ ΦΩΝΗΕΝΤΩΝ:

		//α-η,α-ι,α-υ
		while (fs[0].endsWith("A") && ss[0].startsWith("I") )
		{
			if (ss[1].startsWith("η")||ss[1].startsWith("ι")||ss[1].startsWith("ϊ")
				||ss[1].startsWith("υ")||ss[1].startsWith("ϋ"))
			{
				if (ss[1].equals("ι")) ss[1]="ϊ";
				else if (ss[1].equals("υ")) ss[1]="ϋ";
				return ss;
			}
			else ss=findNextSyllable(fs,j);
		}
		//α-ε
		while (fs[0].endsWith("A") && ss[0].startsWith("E") )
		{
			if (ss[1].startsWith("ε"))//δεν υπάρχει α-αι
				return ss;
			else ss=findNextSyllable(fs,j);
		}
		//ε-ε, αι-ε
		while (fs[0].endsWith("E") && ss[0].startsWith("E") )
		{
			if (fs[1].startsWith("ε")&&ss[1].startsWith("ε"))
				return ss;
			else if (fs[1].startsWith("αι")&&ss[1].startsWith("ε"))
				return ss;
			else ss=findNextSyllable(fs,j);
		}
		//ε-η, ε-ι, ε-ει, αι-η,
		while (fs[0].endsWith("E") && ss[0].startsWith("I") )
		{
			if (fs[1].startsWith("ε")&&ss[1].startsWith("η"))
				return ss;
			else if (fs[1].startsWith("ε")&&(ss[1].startsWith("ι")||ss[1].startsWith("ϊ")))
			{
				if (ss[1].equals("ι")) ss[1]="ϊ";
				return ss;
			}
			else if (fs[1].startsWith("ε")&&ss[1].startsWith("ει"))
				return ss;
			else if (fs[1].startsWith("αι")&&ss[1].startsWith("η"))
				return ss;
			else ss=findNextSyllable(fs,j);
		}
		//ι-η, ι-ι, ι-ει, ι-οι, υ-η, υ-ι, ει-οι, οι-η, υι-οι
		while (fs[0].endsWith("I") && ss[0].startsWith("I") )
		{
			if (fs[1].startsWith("ι")&&ss[1].startsWith("η"))
				return ss;
			else if (fs[1].startsWith("ι")&&(ss[1].startsWith("ι")||ss[1].startsWith("ϊ")))
				return ss;
			else if (fs[1].startsWith("ι")&&ss[1].startsWith("ει"))
				return ss;
			else if (fs[1].startsWith("ι")&&ss[1].startsWith("οι"))
				return ss;
			else if (fs[1].startsWith("υ")&&ss[1].startsWith("η"))
				return ss;
			else if (fs[1].startsWith("υ")&&(ss[1].startsWith("ι")||ss[1].startsWith("ϊ")))
				return ss;
			else if (fs[1].startsWith("ει")&&ss[1].startsWith("οι"))
				return ss;
			else if (fs[1].startsWith("οι")&&ss[1].startsWith("η"))
				return ss;
			else if (fs[1].startsWith("υι")&&ss[1].startsWith("οι"))
				return ss;
			else ss=findNextSyllable(fs,j);
		}
		//ο-η,ο-ι,ο-υ,ο-ει,ο-οι,ω-ι
		while (fs[0].endsWith("O") && ss[0].startsWith("I") )
		{
			if (fs[1].startsWith("ο")&&ss[1].startsWith("η"))
				return ss;
			else if (fs[1].startsWith("ο")&&(ss[1].startsWith("ι")||ss[1].startsWith("υ")))
			{
				if (ss[1].equals("ι")) ss[1]="ϊ";
				else if (ss[1].equals("υ")) ss[1]="ϋ";
				return ss;
			}
			else if (fs[1].startsWith("ο")&&(ss[1].startsWith("ει")||ss[1].startsWith("οι")))
				return ss;
			else if (fs[1].startsWith("ο")&&(ss[1].startsWith("ϊ")||ss[1].startsWith("ϋ")))
				return ss;
			else if (fs[1].startsWith("ω")&&(ss[1].startsWith("ι")||ss[1].startsWith("ϊ")))
				return ss;
			else ss=findNextSyllable(fs,j);
		}
		//ΑΝ η δσ αρχίζει με ϊ,ϋ
		//ΤΟΤΕ η πρώτη πρέπει να τελειώνει σε φωνήεν ή να αλλάξουμε τη δσ. 2002.02.16

		// τα ίδια σύμφωνα να αφομοιώνονται. (εδώ ψάχνουμε για άλλη)
		while (fs[0].charAt(fs[0].length()-1)==ss[0].charAt(0) && !isVowelFonal(ss[0].charAt(0)))
		{
			ss=findNextSyllable(fs,j);
		}

		//ΑΡΧΗ ΔΕΥΤΕΡΗΣ: άν δεν ταιριάζει, ξανά από την αρχή.

		// Z;σ μόνο ΠΡΙΝ από β,μ,μπ
		if (fs[0].endsWith("Z") && fs[1].endsWith("σ") )
		{
			if (ss[0].startsWith("V")||ss[0].startsWith("M")||ss[0].startsWith("B")
				||ss[0].startsWith("Y")||ss[0].startsWith("Δ")||ss[0].startsWith("L")
				||ss[0].startsWith("N") ) return ss;
			else ss=findNextSyllable(fs,j);
		}

		// K;ξ μόνο ΠΡΙΝ από ST;τ (κοιτάξτε)
		else if (fs[0].endsWith("K") && fs[1].endsWith("ξ") )
		{
			ss[0]="STE";
			ss[1]="τε";
			return ss;
		}

		// M;μπ μόνο ΠΡΙΝ από T;τ (πέμπτη)
		else if (fs[0].endsWith("K") && fs[1].endsWith("ξ") )
		{
			ss[0]="TI";
			ss[1]="τη";
			return ss;
		}

		//ΑΝ δσ αρχίζει από V;υ ή F;υ
		//ΤΟΤΕ η πσ πρέπει να τελειώνει σε α|ε.
		else if (ss[0].startsWith("V") && ss[1].startsWith("υ"))
		{
			if (fs[1].endsWith("α")||fs[1].endsWith("ε") ) return ss;
			else ss=findNextSyllable(fs,j);
		}
		else if (ss[0].startsWith("F") && ss[1].startsWith("υ"))
		{
			if (fs[1].endsWith("α")||fs[1].endsWith("ε") ) return ss;
			else ss=findNextSyllable(fs,j);
		}

		//εάν πσ τελειώνει σε ρ|ντ, τότε η επόμενη να αρχίζει από ια|ιε |ιο |ιω. 2002.02.14
		else if (ss[0].startsWith("YY") && ss[1].startsWith("ι") )
		{
			if (fs[0].endsWith("R")||fs[0].endsWith("D") ) return ss;
			else ss=findNextSyllable(fs,j);
		}

		//τα διπλά γράμματα, μόνο μετά από φωνήεντα α,ε,ι,ο,υ και όχι αυ,ευ,ου,ει,οι,υι
		else if (ss[1].startsWith("ββ") || ss[1].startsWith("κκ")
				 ||ss[1].startsWith("λλ") || ss[1].startsWith("μμ")
				 ||ss[1].startsWith("νν") || ss[1].startsWith("ππ")
				 ||ss[1].startsWith("ρρ") || ss[1].startsWith("σσ")
				 ||ss[1].startsWith("ττ") )
		{
			if (fs[1].endsWith("α")||fs[1].endsWith("ε")||fs[1].endsWith("ι")
					||fs[1].endsWith("ο")||fs[1].endsWith("υ") )
			{
				if (!fs[1].endsWith("αι")&&!fs[1].endsWith("αυ")
					&&!fs[1].endsWith("ευ")&&!fs[1].endsWith("ει")
					&&!fs[1].endsWith("ου")&&!fs[1].endsWith("οι")&&!fs[1].endsWith("υι") )
					return ss;
				else ss=findNextSyllable(fs,j);
			}
			else ss=findNextSyllable(fs,j);
		}

		//ΑΚΟΛΟΥΘΙΕΣ-ΣΥΜΦΩΝΩΝ:
		//Οταν τελειώνει ΚΑΙ αρχίζει με σύμφωνο, σύμφωνα με τον πίνακα arSequence:
		else if (!isVowelFonal(fs[0].charAt(fs[0].length()-1))
				 	 ||!isVowelFonal(ss[0].charAt(0)))
		{
			String fsc[]=separateFonClusters(fs[0]);
			String ssc[]=separateFonClusters(ss[0]);
			if (isArrayElement(fsc[2]+ssc[0],arSequence))
				findValidFonalSyllSeparation(fs,ss);
			else ss=findNextSyllable(fs,j);
		}

		return ss;
	}//end of findNextSyllable.

	/**
	 * LastModified: 2002.02.17
	 * Created: 2002.02.13
	 * @author nikkas
	 *
	 * Modifies the sequence of the two syllables WITHOUT REPLACING them with an other syllable.
	 */
	public void checkSequence(String[] fs, String[] ss)
	{
		//πρώτα ότι μπορούμε να βγάλουμε συμπέρασμα:

		//ΑΚΟΛΟΥΘΙΕΣ ΦΩΝΗΕΝΤΩΝ:
		if (fs[0].endsWith("O") && ss[0].startsWith("I") )
		{
			if (fs[1].startsWith("ο")&&ss[1].startsWith("η"))
				return ;
			else if (fs[1].startsWith("ο")&&(ss[1].startsWith("ι")||ss[1].startsWith("ϊ")))
				return ;
			else if (fs[1].startsWith("ο")&&(ss[1].startsWith("ει")||ss[1].startsWith("οι")))
				return ;
			else if (fs[1].startsWith("ο")&&(ss[1].startsWith("υ")||ss[1].startsWith("ϋ")))
				return ;
			else if (fs[1].startsWith("ω")&&(ss[1].startsWith("ι")||ss[1].startsWith("ϊ")))
				return ;
			else
			{
				String cl[]=separateFonClusters(ss[0]);
				ss[1]="ι"+getGrafCluster(cl[2]);
				return;
			}
		}

		//ΕΑΝ προηγ-συλ τελειώνει σε υ/φ, //ΤΟΤΕ η επόμενη πρέπει να αρχίζει από //θ,κ,ξ,σ,τ,π,x
		if (fs[0].endsWith("F") && fs[1].endsWith("υ") )
		{
			if (!ss[0].startsWith("Q")&&!ss[0].startsWith("K")&&!ss[0].startsWith("S")
					&&!ss[0].startsWith("T")&&!ss[0].startsWith("P")&&!ss[0].startsWith("H") )
			{
				fs[0]=fs[0].substring(0,fs[0].length()-1); fs[1]=fs[1].substring(0,fs[1].length()-1);
			}
		}

		//ΑΚΟΛΟΥΘΙΕΣ-ΣΥΜΦΩΝΩΝ:

		// ΕΞΑΦΑΝΙΣΗ τελικού συμφώνου π.σ.:
		//PAN - NI - YI1 - TOS >> PA - NI - YI1 - TOS
		//PAY - GO - HE1 - TOS >> PA - GO - HE1 - TOS
		//ΑΝ το τελευταίο ΣΥΜΦΩΝΟ της πσ είναι ίδιο με το ΠΡΩΤΟ της δσ
		//ΤΟΤΕ αφαιρώ τον τελευταίο χαρακτήρα της πσ.
		if (fs[0].charAt(fs[0].length()-1)==ss[0].charAt(0) && !isVowelFonal(ss[0].charAt(0)))
		{
			fs[0]=fs[0].substring(0,fs[0].length()-1);
			fs[1]=fs[1].substring(0,fs[1].length()-1);
		}

		//σύμφωνα με τον πίνακα arSequence:
		//Θεωρώ και την περίπτωση κάποιος να ΓΡΑΨΕΙ μη δεκτή ακολουθία.
		else if (!isVowelFonal(fs[0].charAt(fs[0].length()-1))
					 ||!isVowelFonal(ss[0].charAt(0)))
		{
			String ffc[]=separateFonClusters(fs[0]);
			String sfc[]=separateFonClusters(ss[0]);
			String fgc[]=separateGrafClusters(fs[1]);
			String sgc[]=separateGrafClusters(ss[1]);
			String nc=ffc[2]+sfc[0];
			while (nc.length()>1)
			{
				if (isArrayElement(nc,arSequence)) break;
  			else	nc=nc.substring(1);
			}
			if (nc.length()>sfc[0].length())
			{
				fs[0]=ffc[0]+ffc[1]+nc.substring(0,nc.length()-sfc[0].length());
				fs[1]=fgc[0]+fgc[1]+getGrafCluster(nc.substring(0,nc.length()-sfc[0].length()));
			}
			else //
			{
				fs[0]=ffc[0]+ffc[1];
				fs[1]=fgc[0]+fgc[1];
				ss[0]=nc+sfc[1]+sfc[2];
				ss[1]=getGrafCluster(nc)+sgc[1]+sgc[2];
			}

			findValidFonalSyllSeparation(fs,ss);
  	}

		//ΑΝ η δσ είναι 'ι' ή 'υ' και προηγούμενη έχει α|ο|ε,
		//ΤΟΤΕ η δσ χρειάζεται διαλυτικά. 2002.02.16
		//Οταν όμως τονίζεται η πρώτη, δεν χρειάζονται (το πρόγραμμα τα βάζει κατα τη διαδικασία τονισμού). 2002.02.16
		else if (ss[1].equals("ι")) //αλλιώς διαβάζουμε ι
		{
			if (fs[1].endsWith("α") || fs[1].endsWith("ε") || fs[1].endsWith("ο"))
			{
				ss[1]="ϊ";
			}
		}
		else if (ss[1].equals("υ")) //αλλιώς διαβάζουμε αφ|β, εφ|β, ου
		{
			if (fs[1].endsWith("α") || fs[1].endsWith("ε") || fs[1].endsWith("ο"))
			{
				ss[1]="ϋ";
			}
		}

	}//end of checkSequence.

	/**
	 * LastModified:
	 * Created: 2002.02.18
	 * @author nikkas
	 *
	 * input: 2 fonal syllables as arrays.
	 * do: makes a valid separation.
	 */
	public void findValidFonalSyllSeparation(String fs[], String ss[])
	{
		//σύμφωνο+φωνήεν αλλαγή (μόνο στη προφορά) της συλλαβής.
		if (isVowelFonal(ss[0].charAt(0)) )
		{
			//find the clusters of the fs:
			String[] clst=separateFonClusters(fs[0]);
			String nc=clst[2];//the new third cluster;
			//check what part of the 3rd cluster belongs to first-word-cluster
			while (nc.length()>1)
			{
				if (isArrayElement(nc,arFirstCluster))
					break;
				else
					nc=nc.substring(1);
			}
			//make the 2 syllables:
			fs[0]=clst[0]+clst[1]+clst[2].substring(0,clst[2].length()-nc.length());
			ss[0]=nc+ss[0];
			if (ss[1].equals("ϊ")) ss[1]="ι";
			else if (ss[1].equals("ϋ")) ss[1]="υ";
		}

  	//1)N-T>>-D, M-P>>-B
  	else if (fs[0].endsWith("N")&&ss[0].startsWith("T"))
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-1);
  		ss[0]="D"+ss[0].substring(1);
  		return;
  	}
  	//δεν είναι αποδεκτή η ακολουθία M-P
  	else if (fs[0].endsWith("M")&&ss[0].startsWith("P"))
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-1);
  		ss[0]="D"+ss[0].substring(1);
  		return;
  	}
  	//2) να αλλάξουν οι συλλαβές πχ SK-L >> -SKL
  	else if (fs[0].endsWith("SK")&& (ss[0].startsWith("L")
  																 ||ss[0].startsWith("N")
  																 ||ss[0].startsWith("R")) )
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-2);
  		ss[0]="SK"+ss[0];
  		return;
  	}
  	else if (fs[0].endsWith("SP")&& (ss[0].startsWith("YY")
  																 ||ss[0].startsWith("L")
  																 ||ss[0].startsWith("R")) )
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-2);
  		ss[0]="SP"+ss[0];
  		return;
  	}
  	else if (fs[0].endsWith("ST")&& (ss[0].startsWith("YY")
  																 ||ss[0].startsWith("R")) )
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-2);
  		ss[0]="ST"+ss[0];
  		return;
  	}
  	else if (fs[0].endsWith("SF")&& ss[0].startsWith("R") )
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-2);
  		ss[0]="SF"+ss[0];
  		return;
  	}
  	else if (fs[0].endsWith("V")&& (ss[0].startsWith("L")
  																 ||ss[0].startsWith("R")) )
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-1);
  		ss[0]="V"+ss[0];
  		return;
  	}
  	else if (fs[0].endsWith("Δ")&& ss[0].startsWith("R"))
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-1);
  		ss[0]="Δ"+ss[0];
  		return;
  	}
  	else if (fs[0].endsWith("Z")&& ss[0].startsWith("M"))
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-1);
  		ss[0]="Z"+ss[0];
  		return;
  	}
  	else if (fs[0].endsWith("Q")&& ss[0].startsWith("R"))
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-1);
  		ss[0]="Q"+ss[0];
  		return;
  	}
  	else if (fs[0].endsWith("P")&& (ss[0].startsWith("L")
  																 ||ss[0].startsWith("N")
  																 ||ss[0].startsWith("R")) )
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-1);
  		ss[0]="P"+ss[0];
  		return;
  	}
  	else if (fs[0].endsWith("T")&& (ss[0].startsWith("S")
  																 ||ss[0].startsWith("R")) )
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-1);
  		ss[0]="T"+ss[0];
  		return;
  	}
  	else if (fs[0].endsWith("F")&& ss[0].startsWith("R"))
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-1);
  		ss[0]="F"+ss[0];
  		return;
  	}
  	else if (fs[0].endsWith("H")&& ss[0].startsWith("R"))
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-1);
  		ss[0]="H"+ss[0];
  		return;
  	}
  	else if (fs[0].endsWith("D")&& ss[0].startsWith("Z"))
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-1);
  		ss[0]="D"+ss[0];
  		return;
  	}
  	else if (fs[0].endsWith("G")&& ss[0].startsWith("L"))
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-2);
  		ss[0]="G"+ss[0];
  		return;
  	}
  	// ΚΑΙ αλλαγή στη γραπτή.
  	else if (fs[0].endsWith("K")&& ss[0].startsWith("S"))
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-1);
  		fs[1]=fs[1].substring(0,fs[1].length()-1);
  		ss[0]="K"+ss[0];
  		ss[1]="ξ"+ss[1].substring(1);
  		return;
  	}
  	else if (fs[0].endsWith("P")&& ss[0].startsWith("S"))
  	{
  		fs[0]=fs[0].substring(0,fs[0].length()-1);
  		fs[1]=fs[1].substring(0,fs[1].length()-1);
  		ss[0]="P"+ss[0];
  		ss[1]="ψ"+ss[1].substring(1);
  		return;
  	}
	}

} //end of GWCreator class.

/*
GWCreator:
	private TextField fieldWord;
	private TextField fieldPron;
	private TextField fieldSyllF1; //starting syllable.
	private TextField fieldSyllF2; //second syllable.
	private TextField fieldSyllL2; //before last syllable.
	private TextField fieldSyllL1; // ending syllable.
	private Choice choiceSyllNumber;
	private Choice choiceStress;
//	private Choice choiceProb;
	private Button btCreate;
 	private String ts="";//a temporal-string to hold the output of checkSequence().
	private String arFirstCluster[]=
	private String arSequence[]=
	private String arSylF[]=//923 elements.
	private double arSylFProb[]=//923 elements.
	private String arSylM[]= //805 elements.
	private double arSylMProb[]= //805 elements.
	private String arSylL[]= //955 elements.
	private double arSylLProb[]= //955 elements.
	private String arAefv[]= {"φ","β"};
	private double arAefvProb[]= {0.5, 0.5};
	private String arM[]= {"μ","μμ"};
	private double arMProb[]= {0.93, 0.07};
	private String arL[]= {"λ","λλ"};
	private double arLProb[]= {0.975, 0.025};
	private String arG[]= {"γκ","γγ"};
	private double arGProb[]= {0.693965517, 0.306034483};
	private String arE[]= {"ε","αι"};
	private double arEProb[]= {0.469025898, 0.530974102};
	private String arI[]= {"ι","η","υ","ει","οι"};
	private double arIProb[]= {0.401535282, 0.313551816, 0.131532329, 0.114038973, 0.0393416};
	private String arO[]= {"ο","ω"};
	private double arOProb[]= {0.739038504, 0.260961496};


	public void 		init()
  public void 		actionPerformed(ActionEvent arE)
	public int 			roll(double prob[]){

	public String 	getGrafSyllable (String fsyll)
	public String[] separateFonClusters(String fsyll)
	public String 	getGrafCluster (String fcluster)
	public String 	getGrafim (String fonim)

	public String 	getFonSyllable (String gsyll)
	public String[] separateGrafClusters(String gsyll)
	public String 	getFonCluster (String gcluster)
	public String 	getFonim (String grafim)

	//MISC:
	public void 		checkSequence(String[] fs, String[] ss)
	public String[] findNextSyllable(String[] fs, int j)
	public void 		findValidFonalSyllSeparation(String fs[], String ss[])
	public String[] getParts(String sl)
	public String 	greekTonosRemove(String word)
	public boolean 	isArrayElement(String s, String[] ar)
	public boolean 	isLetterEnglish(String s)
	public boolean 	isVowelFonal(char c)
	public String[] peakSyllable(int j)
	public void 		setStress(String syl[], String ss[])
	public String 	setStressOnFonal(String syl)
	public String 	setStressOnGrafal(String gsyl)

*/