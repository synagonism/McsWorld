    document.getElementById('idBtnGav').addEventListener('click',
      function(e) {
        document.getElementById('idIptGavUrnm').value
        document.getElementById('idTxtaGav').innerHTML = JSON.stringify(result);
      }
    )

		function fGetPartsIfIrregular(){
	// IRREGULAR
			if (fform.equals("am"))
				forms="am,are,is,was,were,been";
			else if (fform.equals("arise"))
				forms="arise,arises,arose,arising,arisen";
			else if (fform.equals("awake"))
				forms="awake,awakes,awoke|awaked,awaking,awoken|awaked";
			else if (fform.equals("bear"))
				forms="bear,bears,bore,bearing,borne|born";
			else if (fform.equals("beat"))
				forms="beat,beats,beat,beating,beaten|beat";
			else if (fform.equals("become"))
				forms="become,becomes,became,becoming,become";
			else if (fform.equals("begin"))
				forms="begin,begins,began,begining,begun";
			else if (fform.equals("bet"))
				forms="bet,bets,bet|betted,betting,bet|betted";
			else if (fform.equals("bid"))//(to, offer)
				forms="bid,bids,bid,bidding,bid";
			else if (fform.equals("bid"))//(to order, invite)
				forms="bid,bids,bade,bidding,bidden";
			else if (fform.equals("bind"))
				forms="bind,binds,bound,binding,bound";
			else if (fform.equals("bite"))
				forms="bite,bites,bit,biting,bitten";
			else if (fform.equals("bleed"))
				forms="bleed,bleeds,bled,bleeding,bled";
			else if (fform.equals("blow"))
				forms="blow,blows,blew,blowing,blown";
			else if (fform.equals("break"))
				forms="break,breaks,broke,breaking,broken";
			else if (fform.equals("breed"))
				forms="breed,breeds,bred,breeding,bred";
			else if (fform.equals("bring"))
				forms="bring,brings,brought,bringing,brought";
			else if (fform.equals("burst"))
				forms="burst,bursts,burst,bursting,burst";
			else if (fform.equals("buy"))
				forms="buy,buys,bought,buying,bought";
			else if (fform.equals("cast"))
				forms="cast,casts,cast,casting,cast";
			else if (fform.equals("catch"))
				forms="catch,catches,caught,catching,caught";
			else if (fform.equals("choose"))
				forms="choose,chooses,chose,choosing,chosen";
			else if (fform.equals("cling"))
				forms="cling,clings,clung,clinging,clung";
			else if (fform.equals("come"))
				forms="come,comes,came,coming,come";
			else if (fform.equals("creep"))
				forms="creep,creeps,crept,creeping,crept";
			else if (fform.equals("cut"))
				forms="cut,cuts,cut,cutting,cut";
			else if (fform.equals("deal"))
				forms="deal,deals,dealt,dealing,dealt";
			else if (fform.equals("dig"))
				forms="dig,digs,dug,diging,dug";
			else if (fform.equals("dive"))
				forms="dive,dives,dived|dove,diving,dived";
			else if (fform.equals("do"))
				forms="do,does,did,doing,done";
			else if (fform.equals("draw"))
				forms="draw,draws,drew,drawing,drawn";
			else if (fform.equals("dream"))
				forms="dream,dreams,dreamed|dreamt,dreaming,dreamed|dreamt";
			else if (fform.equals("drink"))
				forms="drink,drinks,drank,drinking,drunk";
			else if (fform.equals("drive"))
				forms="drive,drives,drove,driving,driven";
			else if (fform.equals("eat"))
				forms="eat,eats,ate,eating,eaten";
			else if (fform.equals("fall"))
				forms="fall,falls,fell,falling,fallen";
			else if (fform.equals("feed"))
				forms="feed,feeds,fed,feeding,fed";
			else if (fform.equals("feel"))
				forms="feel,feels,felt,feeling,felt";
			else if (fform.equals("fight"))
				forms="fight,fights,fought,fighting,fought";
			else if (fform.equals("find"))
				forms="find,finds,found,finding,found";
			else if (fform.equals("flee"))
				forms="flee,flees,fled,fleeing,fled";
			else if (fform.equals("fly"))
				forms="fly,flys,flew,flying,flown";
			else if (fform.equals("forbid"))
				forms="forbid,forbids,forbade,forbiding,forbidden";
			else if (fform.equals("forget"))
				forms="forget,forgets,forgot,forgetting,forgotten";
			else if (fform.equals("forgive"))
				forms="forgive,forgives,forgave,forgiving,forgiven";
			else if (fform.equals("forsake"))
				forms="forsake,forsakes,forsook,forsaking,forsaken";
			else if (fform.equals("freeze"))
				forms="freeze,freezes,froze,freezing,frozen";
			else if (fform.equals("get"))
				forms="get,gets,got,getting,got|gotten";
			else if (fform.equals("give"))
				forms="give,gives,gave,giving,given";
			else if (fform.equals("go"))
				forms="go,goes,went,going,gone";
			else if (fform.equals("grind"))
				forms="grind,grinds,ground,grinding,ground";
			else if (fform.equals("grow"))
				forms="grow,grows,grew,growing,grown";
			else if (fform.equals("hang"))// to suspend
				forms="hang,hangs,hung,hanging,hung";
			else if (fform.equals("hang"))//to execute
				forms="hang,hangs,hanged,hanging,hanged";
			else if (fform.equals("have"))
				forms="have,haves,had,having,had";
			else if (fform.equals("hear"))
				forms="hear,hears,heard,hearing,heard";
			else if (fform.equals("hide"))
				forms="hide,hides,hid,hiding,hidden";
			else if (fform.equals("hit"))
				forms="hit,hits,hit,hitting,hit";
			else if (fform.equals("hold"))
				forms="hold,holds,held,holding,held";
			else if (fform.equals("hurt"))
				forms="hurt,hurts,hurt,hurting,hurt";
			else if (fform.equals("keep"))
				forms="keep,keeps,kept,keeping,kept";
			else if (fform.equals("kneel"))
				forms="kneel,kneels,knelt|kneeled,kneeling,knelt|kneeled";
			else if (fform.equals("knit"))
				forms="knit,knits,knitted|knit,knitting,knitted|knit";
			else if (fform.equals("know"))
				forms="know,knows,knew,knowing,known";
			else if (fform.equals("lay"))
				forms="lay,lays,laid,laying,laid";
			else if (fform.equals("lead"))
				forms="lead,leads,led,leading,led";
			else if (fform.equals("leap"))
				forms="leap,leaps,leaped|leapt,leaping,leaped|leapt";
			else if (fform.equals("leave"))
				forms="leave,leaves,left,leaving,left";
			else if (fform.equals("lend"))
				forms="lend,lends,lent,lending,lent";
			else if (fform.equals("let"))
				forms="let,lets,let,letting,let";
			else if (fform.equals("lie"))
				forms="lie,lies,lay,lying,lain";
			else if (fform.equals("light"))
				forms="light,lights,lighted|lit,lighting,lighted|lit";
			else if (fform.equals("lose"))
				forms="lose,loses,lost,losing,lost";
			else if (fform.equals("make"))
				forms="make,makes,made,making,made";
			else if (fform.equals("mean"))
				forms="mean,means,meant,meaning,meant";
			else if (fform.equals("meet"))
				forms="meet,meets,met,meeting,met";
			else if (fform.equals("mistake"))
				forms="mistake,mistakes,mistook,mistaking,mistaken";
			else if (fform.equals("overcome"))
				forms="overcome,overcomes,overcame,overcoming,overcome";
			else if (fform.equals("pay"))
				forms="pay,pays,paid,paying,paid";
			else if (fform.equals("prove"))
				forms="prove,proves,proved,proving,proved|proven";
			else if (fform.equals("put"))
				forms="put,puts,put,putting,put";
			else if (fform.equals("quit"))
				forms="quit,quits,quit,quiting,quit";
			else if (fform.equals("read"))
				forms="read,reads,read,reading,read";
			else if (fform.equals("ride"))
				forms="ride,rides,rode,riding,ridden";
			else if (fform.equals("ring"))
				forms="ring,rings,rang,ringing,rung";
			else if (fform.equals("rise"))
				forms="rise,rises,rose,rising,risen";
			else if (fform.equals("run"))
				forms="run,runs,ran,running,run";
			else if (fform.equals("say"))
				forms="say,says,said,saying,said";
			else if (fform.equals("see"))
				forms="see,sees,saw,seeing,seen";
			else if (fform.equals("seek"))
				forms="seek,seeks,sought,seeking,sought";
			else if (fform.equals("sell"))
				forms="sell,sells,sold,selling,sold";
			else if (fform.equals("send"))
				forms="send,sends,sent,sending,sent";
			else if (fform.equals("set"))
				forms="set,sets,set,setting,set";
			else if (fform.equals("shake"))
				forms="shake,shakes,shook,shakeing,shaken";
			else if (fform.equals("shed"))
				forms="shed,sheds,shed,shedding,shed";
			else if (fform.equals("shoot"))
				forms="shoot,shoots,shot,shooting,shot";
			else if (fform.equals("shrink"))
				forms="shrink,shrinks,shrank|shrunk,shrinking,shrunk";
			else if (fform.equals("shut"))
				forms="shut,shuts,shut,shutting,shut";
			else if (fform.equals("sing"))
				forms="sing,sings,sang,singing,sung";
			else if (fform.equals("sink"))
				forms="sink,sinks,sank,sinking,sunk";
			else if (fform.equals("sit"))
				forms="sit,sits,sat,sitting,sat";
			else if (fform.equals("slay"))
				forms="slay,slays,slew,slaying,slain";
			else if (fform.equals("sleep"))
				forms="sleep,sleeps,slept,sleeping,slept";
			else if (fform.equals("slide"))
				forms="slide,slides,slid,sliding,slide";
			else if (fform.equals("sling"))
				forms="sling,slings,slung,slinging,slung";
			else if (fform.equals("slink"))
				forms="slink,slinks,slunk,slinking,slunk";
			else if (fform.equals("speak"))
				forms="speak,speaks,spoke,speaking,spoken";
			else if (fform.equals("speed"))
				forms="speed,speeds,sped|speeded,speeding,sped|speeded";
			else if (fform.equals("spend"))
				forms="spend,spends,spent,spending,spent";
			else if (fform.equals("spin"))
				forms="spin,spins,spun,spinning,spun";
			else if (fform.equals("spit"))
				forms="spit,spits,spit|spat,spitting,spit|spat";
			else if (fform.equals("split"))
				forms="split,splits,split,splitting,split";
			else if (fform.equals("spread"))
				forms="spread,spreads,spread,spreading,spread";
			else if (fform.equals("spring"))
				forms="spring,springs,sprang|sprung,springing,sprung";
			else if (fform.equals("stand"))
				forms="stand,stands,stood,standing,stood";
			else if (fform.equals("steal"))
				forms="steal,steals,stole,stealing,stolen";
			else if (fform.equals("stick"))
				forms="stick,sticks,stuck,sticking,stuck";
			else if (fform.equals("stink"))
				forms="stink,stinks,stank|stunk,stinking,stunk";
			else if (fform.equals("strew"))
				forms="strew,strews,strewed,strewing,strewn";
			else if (fform.equals("stride"))
				forms="stride,strides,strode,striding,stridden";
			else if (fform.equals("strike"))
				forms="strike,strikes,struck,striking,struck";
			else if (fform.equals("string"))
				forms="string,strings,strung,stringing,strung";
			else if (fform.equals("strive"))
				forms="strive,strives,stove|strived,striving,striven|strived";
			else if (fform.equals("swear"))
				forms="swear,swears,swore,swearing,sworn";
			else if (fform.equals("sweep"))
				forms="sweep,sweeps,swept,sweeping,swept";
			else if (fform.equals("swell"))
				forms="swell,swells,swelled,swelling,swelled|swollen";
			else if (fform.equals("swim"))
				forms="swim,swims,swam,swimming,swum";
			else if (fform.equals("swing"))
				forms="swing,swings,swung,swinging,swung";
			else if (fform.equals("take"))
				forms="take,takes,took,taking,taken";
			else if (fform.equals("teach"))
				forms="teach,teachs,taught,teaching,taught";
			else if (fform.equals("tear"))
				forms="tear,tears,tore,tearing,torn";
			else if (fform.equals("tell"))
				forms="tell,tells,told,telling,told";
			else if (fform.equals("think"))
				forms="think,thinks,thought,thinking,though";
			else if (fform.equals("thrive"))
				forms="thrive,thrives,throve|thrived,thriving,throve|thriven";
			else if (fform.equals("throw"))
				forms="throw,throws,threw,throwing,thrown";
			else if (fform.equals("thrust"))
				forms="thrust,thrusts,thrust,thrusting,thrust";
			else if (fform.equals("understand"))
				forms="understand,understands,understood,understanding,understood";
			else if (fform.equals("wake"))
				forms="wake,wakes,woke|waked,waking,waked|woken";
			else if (fform.equals("weep"))
				forms="weep,weeps,wept,weeping,wept";
			else if (fform.equals("win"))
				forms="win,wins,won,winning,won";
			else if (fform.equals("wind"))
				forms="wind,winds,wound,winding,wound";
			else if (fform.equals("wring"))
				forms="wring,wrings,wring,wringing,wrung";
			else if (fform.equals("write"))
				forms="write,writes,wrote,writing,written";

			return forms;
		}

  }
