﻿; comments
; version {2025-04-30}
#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
; #Warn  ; Enable warnings to assist with detecting common errors.
SetWorkingDir C:\xampp\htdocs\dWstSgm  ; Ensures a consistent starting directory.
#Hotstring c  ; makes scripts case-sensitive

;; NOTATIONS:
; CUSTOM notation begin with :
; NUMBER notation begin with ii
; TeX notation begin with    \
; HTML notation begin with   &
; SLAVIC ''
; ARABIC '"

;; EXAMPLES:
;              CUSTOM       HTML
; ACute        :aac = á      &aacute
; BReve        :abr = ă      &abreve
; CircumFlex   :acf = â      &acirc
; CediLla      :acl = ç      &ccedil
; CaRon        :acr = ǎ      &acaron
; DotBelow     :adb = ạ
; DotLess      :idl = ı      &imath
; GRave        :agr = à      &agrave
; HooK         :ahk = ả
; HoRn         :ohr = ơ
; MaCron       :amc = ā      &amacr
; RinG         :arg = å      &aring
; STroke       :dst = đ      &dstrok
; TiLde        :atl = ã      &atilde
; UMlaut       :aum = ä      &auml

; fr-actur     html = &Afr::𝔄
; scr-ipt      html = &Ascr::𝒜

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; CUSTOM and NUMBER NOTATION

:::->::⭢
:::lrr::⟨
:::lrl::⟩

:::aac::á
:::abr::ă
:::abrac::ắ
:::abrgr::ằ
:::abrhk::ẳ
:::abrtl::ẵ
:::abrdb::ặ
:::acr::ǎ
:::acf::â
:::acfac::ấ
:::acfgr::ầ
:::acfhk::ẩ
:::acftl::ẫ
:::acfdb::ậ
:::agr::à
:::adb::ạ
:::Adb::Ạ
:::ahk::ả
:::Ahk::Ả
:::amc::ā
:::arg::å
:::atl::ã
:::aum::ä

:::eac::é
:::ecr::ě
:::ecf::ê
:::ecfac::ế
:::ecfgr::ề
:::ecfhk::ể
:::ecftl::ễ
:::ecfdb::ệ
:::eum::ë
:::edb::ẹ
:::egr::è
:::ehk::ẻ
:::emc::ē
:::etl::ẽ

:::imc::ī
:::iac::í
:::icr::ǐ
:::igr::ì
:::idb::ị
:::idl::ı
:::ihk::ỉ
:::itl::ĩ
:::ium::ï

:::oac::ó
:::obr::ŏ
:::ocf::ô
:::ocfac::ố
:::ocfgr::ồ
:::ocfhk::ổ
:::ocftl::ỗ
:::ocfdb::ộ
:::ocr::ǒ
:::odb::ọ
:::ohk::ỏ
:::ohn::ơ
:::ohngr::ờ
:::ohnac::ớ
:::ohnhk::ở
:::ohntl::ỡ
:::ohndb::ợ
:::omc::ō
:::ogr::ò
:::ost::ø
:::otl::õ
:::oum::ö

:::umc::ū
:::uac::ú
:::ucr::ǔ
:::udb::ụ
:::ugr::ù
:::uhn::ư
:::uhngr::ừ
:::uhnac::ứ
:::uhnhk::ử
:::uhntd::ữ
:::uhndb::ự
:::uhk::ủ
:::utl::ũ
:::uum::ü


:::yac::ý
:::ygr::ỳ
:::ydb::ỵ
:::yhk::ỷ
:::ytl::ỹ


:::ccl::ç
:::ccf::ĉ

:::Dst::Đ
:::dst::đ
:::dlb::ḏ
:::ddb::ḍ

:::gmc::ḡ
:::gbr::ğ
:::gcr::ǧ
:::gcf::ĝ

:::hcf::ĥ
:::hdb::ḥ

:::jcf::ĵ

:::klb::ḵ

:::Ntl::Ñ
:::ntl::ñ

:::scl::ş
:::scf::ŝ
:::ss::ß
:::scr::š
:::sdb::ṣ

:::tlb::ṯ
:::tdb::ṭ

:::zdb::ẓ

:::fg1::ʻ
:::fg2::ʕ
:::fg3::ˤ

::ii128::€
::ii8364::€
:::euro::€

::ii183::·
:::sentence::·

::ii215::×

::ii305::ı
:::id::ı

::ii12290::。
:::ZhonFullstop::。

::ii120143::𝕏
:::Xdouble::𝕏

::ii120169::𝕩
:::xdouble::𝕩

;;;;;;;;;;;;;;;;;;;;;;;; SLAVIC ALPHABET
;;Russian: Аа,Бб,Вв,Гг,Дд,Ее,Ёё,Жж,Зз,Ии,Йй,Кк,Лл,Мм,Нн,Оо,Пп,Рр,Сс,Тт,
;;Уу,Фф,Хх,Цц,Чч,Шш,Щщ,Ъъ,Ыы,Ьь,Ээ,Юю,Яя.
;;Bulgarian:  Аа,Бб,Вв,Гг,Дд,Ее,Жж,Зз,Ии,Йй,Кк,Лл,Мм,Нн,Оо,Пп,Рр,Сс,Тт,
;;Уу,Фф,Хх,Цц,Чч,Шш,Щщ,Ъъ,Ьь,Юю,Яя.
;;Serbian: Аа,Бб,Вв,Гг,Дд,Ђђ,Ее,Жж,Зз,Ии,Јј,Кк,Лл,Љљ,Мм,Нн,Њњ,Оо,Пп,Рр,Сс,
;;Тт,Ћћ,Уу,Фф,Хх,Цц,Чч,Џџ,Шш.


::''A::А
::''a::а
::''B::Б
::''b::б
::''V::В
::''v::в
::''G::Г
::''g::г
::''D::Д
::''d::д
::''Dj::Ђ   ;;serbian
::''dj::ђ
::''Ye::Е  ;;/e/ bulgarian
::''ye::е
::''Yo::Ё
::''yo::ё
::''Zh::Ж
::''zh::ж
::''Z::З
::''z::з
::''I::И
::''i::и
::''Ibr::Й
::''ibr::й
::''Y::Ј   ;; /y/ serbian (yes)
::''y::ј
::''K::К
::''k::к
::''L::Л
::''l::л
::''Lj::Љ  ;; palatized serbian
::''lj::љ
::''M::М
::''m::м
::''N::Н
::''n::н
::''Nj::Њ   ;; palatized Serbian
::''nj::њ
::''O::О
::''o::о
::''P::П
::''p::п
::''R::Р
::''r::р
::''S::С
::''s::с
::''T::Т
::''Th::Ћ ;;Soft "t" sound, unique to Serbian
::''th::ћ
::''t::т
::''U::У
::''u::у
::''F::Ф
::''f::ф
::''H::Х
::''h::х
::''C::Ц
::''c::ц
::''Ch::Ч
::''ch::ч
::''Sh::Ш
::''sh::ш
::''Shj::Щ
::''sjh::щ
::''Dz::Џ   ;;Serbian
::''dz::џ
::''Hd::Ъ
::''hd::ъ
::''Ib::Ы
::''ib::ы
::''Sf::Ь
::''sf::ь
::''E::Э
::''e::э
::''Yu::Ю
::''yu::ю
::''Ya::Я
::''ya::я

;;;;;;;;;;;;;;;;;;;;;; ARABIC

::'"aa::ا
::'"b::ب
::'"t::ت
::'"th::ث
::'"J::ج
::'"hf::ح
::'"H::خ
::'"d::د
::'"dh::ذ
::'"r::ر
::'"z::ز
::'"s::س
::'"S::ش
::'"so::ص
::'"do::ض
::'"to::ط
::'"dho::ظ
::'"af::ع
::'"yr::غ
::'"f::ف
::'"kf::ق
::'"k::ك
::'"l::ل
::'"m::م
::'"n::ن
::'"h::ه
::'"uu::و
::'"ii::ي

::'"dmm::ُ
::'"fth::َ
::'"ksr::ِ
::'"skn::ْ

;;;;;;;;;;;;;;;;;;;;;;;; TeX-NOTATION with their unicodes equivalents

::\Alpha::Α
::\Beta::Β
::\Box::◻
::\C::ℂ
::\Chi::Χ
::\Delta::Δ
::\Downarrow::⇓
::\Epsilon::Ε
::\Eta::Η
::\Gamma::Γ
::\Im::ℑ
::\Iota::Ι
::\Kappa::Κ
::\Lambda::Λ
::\Leftarrow::⇐
::\Leftrightarrow::⇔
::\Lleftarrow::⇚
::\Longleftarrow::⟸
::\Longleftrightarrow::⟺
::\Longrightarrow::⟹
::\Lsh::↰
::\Mu::Μ
::\N::ℕ
::\Nu::Ν
::\O::∅
::\Omega::Ω
::\Omicron::Ο
::\Phi::Φ
::\Pi::Π
::\Psi::Ψ
::\Q::ℚ
::\R::ℝ
::\Re::ℜ
::\Rho::Ρ
::\Rightarrow::⇒
::\Rrightarrow::⇛
::\Rsh::↱
::\Sigma::Σ
::\Tau::Τ
::\Theta::Θ
::\Uparrow::⇑
::\Updownarrow::⇕
::\Upsilon::Υ
::\Xi::Ξ
::\Z::ℤ
::\Zeta::Ζ
::\aleph::ℵ
::\alpha::α
::\amalg::⨿
::\angle::∠
::\approx::≈
::\ast::∗
::\asymp::≍
::\beta::β
::\beth::ℶ
::\bigcirc::◯
::\bigtriangledown::▽
::\bigtriangleup::△
::\bot::⊥
::\bowtie::⋈
::\bullet::∙
::\cap::∩
::\cdot::⋅
::\chi::χ
::\circ::∘
::\circlearrowleft::↺
::\circlearrowright::↻
::\cong::≅
::\cup::∪
::\curvearrowleft::↶
::\curvearrowright::↷
::\dagger::†
::\dashleftarrow::⤎
::\dashrightarrow::⤏
::\dashv::⊣
::\ddagger::‡
::\delta::δ
::\diamond::⋄
::\digamma::ϝ
::\div::÷
::\doteq::≐
::\downarrow::↓
::\downdownarrows::⇊
::\downharpoonleft::⇃
::\downharpoonright::⇂
::\ell::ℓ
::\emptyset::∅
::\epsilon::ε
::\equiv::≡
::\eta::η
::\eth::ð
::\exists!::∃!
::\exists::∃
::\forall::∀
::\gamma::γ
::\geq::≥
::\geqslant::⩾
::\gets::←
::\gg::≫
::\ggg::⋙
::\gimel::ℷ
::\gnapprox::⪊
::\gneq::⪈
::\gneqq::≩
::\gnsim::⋧
::\gvertneqq::≩
::\hbar::ℏ
::\hookleftarrow::↩
::\hookrightarrow::↪
::\iff::⟺
::\implies::⟹
::\in::∈
::\infty::∞
::\int::∫
::\iota::ι
::\kappa::κ
::\lambda::λ
::\land::∧
::\langle::⟨
::\lceil::⌈
::\leadsto::⇝
::\leftarrow::←
::\leftarrowtail::↢
::\leftharpoondown::↽
::\leftharpoonup::↼
::\leftleftarrows::⇇
::\leftrightarrow::↔
::\leftrightarrows::⇆
::\leftrightharpoons::⇋
::\leftrightsquigarrow::↭
::\leq::≤
::\leqslant::⩽
::\lfloor::⌊
::\ll::≪
::\llcorner::⌞
::\lll::⋘
::\lnapprox::⪉
::\lneq::⪇
::\lneqq::≨
::\lnsim::⋦
::\longleftarrow::⟵
::\longleftrightarrow::⟷
::\longmapsto::⟼
::\longrightarrow::⟶
::\looparrowleft::↫
::\looparrowright::↬
::\lor::∨
::\lrcorner::⌟
::\lvertneqq::≨
::\mapsto::↦
::\measuredangle::∡
::\mid::∣
::\models::⊨
::\mp::∓
::\mu::μ
::\multimap::⊸
::\nLeftarrow::⇍
::\nLeftrightarrow::⇎
::\nRightarrow::⇏
::\nVDash::⊯
::\nVdash::⊮
::\nabla::∇
::\ncong::≆
::\ne::≠
::\nequal::≠
::\nearrow::↗
::\neg::¬
::\neq::≠
::\nexists::∄
::\ngeq::≱
::\ngeqq::≱
::\ngeqslant::⪈
::\ngtr::≯
::\ni::∋
::\nleftarrow::↚
::\nleftrightarrow::↮
::\nleq::≰
::\nleqq::≰
::\nleqslant::⪇
::\nless::≮
::\nmid::∤
::\notsubset::⊄
::\notsupset::⊅
::\notin::∉
::\nparallel::∦
::\nprec::⊀
::\npreceq::⋠
::\nrightarrow::↛
::\nshortmid::∤
::\nshortparallel::∦
::\nsim::≁
::\nsubset::⊄
::\nsubseteq::⊈
::\nsubseteqq::⊈
::\nsucc::⊁
::\nsucceq::⋡
::\nsupset::⊅
::\nsupseteq::⊉
::\nsupseteqq::⊉
::\ntriangleleft::⋪
::\ntrianglelefteq::⋬
::\ntriangleright::⋫
::\ntrianglerighteq::⋭
::\nu::ν
::\nvDash::⊭
::\nvdash::⊬
::\nwarrow::↖
::\odot::⊙
::\omega::ω
::\omicron::ο
::\ominus::⊖
::\oplus::⊕
::\oslash::⊘
::\otimes::⊗
::\parallel::∥
::\partial::∂
::\perp::⊥
::\phi::φ
::\pi::π
::\pm::±
::\prec::≺
::\preceq::⪯
::\precnapprox::⪹
::\precneqq::⪵
::\precnsim::⋨
::\propto::∝
::\psi::ψ
::\rangle::⟩
::\rceil::⌉
::\rfloor::⌋
::\rho::ρ
::\rightarrow::→
::\rightarrowtail::↣
::\rightharpoondown::⇁
::\rightharpoonup::⇀
::\rightleftarrows::⇄
::\rightleftharpoons::⇌
::\rightrightarrows::⇉
::\rightsquigarrow::↝
::\searrow::↘
::\setminus::∖
::\sigma::σ
::\sim::∼
::\simeq::≃
::\sqcap::⊓
::\sqcup::⊔
::\sqrt3::∛
::\sqrt::√
::\sqsubset::⊏
::\sqsubseteq::⊑
::\sqsupset::⊐
::\sqsupseteq::⊒
::\square::◻
::\star::⋆
::\subset::⊂
::\subseteq::⊆
::\subsetneq::⊊
::\subsetneqq::⫋
::\succ::≻
::\succeq::⪰
::\succnapprox::⪺
::\succneqq::⪶
::\succnsim::⋩
::\supset::⊃
::\supseteq::⊇
::\supsetneq::⊋
::\supsetneqq::⫌
::\swarrow::↙
::\tau::τ
::\theta::θ
::\times::×
::\to::→
::\top::⊤
::\triangle::△
::\triangleleft::◃
::\triangleright::▹
::\twoheadleftarrow::↞
::\twoheadrightarrow::↠
::\ulcorner::⌜
::\uparrow::↑
::\updownarrow::↕
::\upharpoonleft::↿
::\upharpoonright::↾
::\uplus::⊎
::\upsilon::υ
::\upuparrows::⇈
::\urcorner::⌝
::\varepsilon::𝜖
::\varnothing::∅
::\varphi::𝜙
::\varpi::𝜛
::\varrho::𝜚
::\varsubsetneq::⊊
::\varsubsetneqq::⫋
::\varsupsetneq::⊋
::\varsupsetneqq::⫌
::\vartheta::𝝑
::\vdash::⊢
::\vee::∨
::\wedge::∧
::\wp::℘
::\wr::≀
::\xi::ξ
::\zeta::ζ
::\|::‖


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; HTML-NOTATION with its Unicode counterparts
; Aopf::𝔸  = A with open-face, double-struck
; Afr::𝔄   = A with franktur
; Ascr::𝒜  = A with script
; Aacute::Á = A with acute
; Abreve::Ă = A with breve
; Acaron::Ǎ = A with caron
; Acirc::Â  = A with circumfex
; Agrave::À = A with grave
; Amacr::Ā  = A with macron
; Aogon::Ą  = A with
; Aring::Å  = A with ring
; Atilde::Ã = A with tilde
; Auml::Ä   = A with umlat|diaeresis
; acute        html = &Aacute::Á
; breve        html = &Abreve::Ă
; caron        html = &Acaron::Ǎ
; cedil-la     html = &Ccedil::Ç
; circ-umflex  html = &Acirc::Â
; diaeresis    html = &Auml::Ä
; DotLess      ı
; fr-actur     html = &Afr::𝔄
; grave        html = &Agrave::À
; macr-on      html = &Amacr::Ā
; ring         html = &Aring::Å
; scr-ipt      html = &Ascr::𝒜
; tilde        html = &Atilde::Ã

::&AElig::Æ
::&Aacute::Á
::&Abreve::Ă
::&Acaron::Ǎ
::&Acirc::Â
::&Acy::А
::&Afr::𝔄
::&Agrave::À
::&Alpha::Α
::&Amacr::Ā
::&And::⩓
::&Aogon::Ą
::&Aopf::𝔸
::&Aring::Å
::&Ascr::𝒜
::&Atilde::Ã
::&Auml::Ä
::&Barv::⫧
::&Barwed::⌆
::&Bcy::Б
::&Beta::Β
::&Bfr::𝔅
::&Bopf::𝔹
::&CHcy::Ч
::&Cacute::Ć
::&Cap::⋒
::&CapitalDifferentialD::ⅅ
::&Ccaron::Č
::&Ccedil::Ç
::&Ccirc::Ĉ
::&Cconint::∰
::&Cdot::Ċ
::&Cfr::ℭ
::&Chi::Χ
::&Colon::∷
::&Colone::⩴
::&Conint::∯
::&Copf::ℂ
::&Cross::⨯
::&Cscr::𝒞
::&Cup::⋓
::&DDotrahd::⤑
::&DJcy::Ђ
::&DScy::Ѕ
::&DZcy::Џ
::&Dagger::‡
::&Darr::↡
::&Dashv::⫤
::&Dcaron::Ď
::&Dcy::Д
::&Delta::Δ
::&Dfr::𝔇
::&DifferentialD::ⅆ
::&Dopf::𝔻
::&Dot::¨
::&DotDot::⃜
::&DownArrowBar::⤓
::&DownBreve::̑
::&DownLeftRightVector::⥐
::&DownLeftTeeVector::⥞
::&DownLeftVectorBar::⥖
::&DownRightTeeVector::⥟
::&DownRightVectorBar::⥗
::&DownTeeArrow::↧
::&Dscr::𝒟
::&Dstrok::Đ
::&ENG::Ŋ
::&ETH::Ð
::&Eacute::É
::&Ecaron::Ě
::&Ecirc::Ê
::&Ecy::Э
::&Edot::Ė
::&Efr::𝔈
::&Egrave::È
::&Emacr::Ē
::&EmptySmallSquare::◻
::&EmptyVerySmallSquare::▫
::&Eogon::Ę
::&Eopf::𝔼
::&Epsilon::Ε
::&Equal::⩵
::&Escr::ℰ
::&Esim::⩳
::&Eta::Η
::&Euml::Ë
::&ExponentialE::ⅇ
::&Fcy::Ф
::&Ffr::𝔉
::&FilledSmallSquare::◼
::&Fopf::𝔽
::&Fscr::ℱ
::&GJcy::Ѓ
::&Gamma::Γ
::&Gammad::Ϝ
::&Gbreve::Ğ
::&Gcedil::Ģ
::&Gcirc::Ĝ
::&Gcy::Г
::&Gdot::Ġ
::&Gfr::𝔊
::&Gg::⋙
::&Gopf::𝔾
::&GreaterGreater::⪢
::&Gscr::𝒢
::&Gt::≫
::&HARDcy::Ъ
::&Hat::^
::&Hcirc::Ĥ
::&Hfr::ℌ
::&Hstrok::Ħ
::&IEcy::Е
::&IJlig::Ĳ
::&IOcy::Ё
::&Iacute::Í
::&Icirc::Î
::&Icy::И
::&Idot::İ
::&Igrave::Ì
::&Imacr::Ī
::&ImaginaryI::ⅈ
::&Int::∬
::&Iogon::Į
::&Iopf::𝕀
::&Iota::Ι
::&Iscr::ℐ
::&Itilde::Ĩ
::&Iukcy::І
::&Iuml::Ï
::&Jcirc::Ĵ
::&Jcy::Й
::&Jfr::𝔍
::&Jopf::𝕁
::&Jscr::𝒥
::&Jsercy::Ј
::&Jukcy::Є
::&KHcy::Х
::&KJcy::Ќ
::&Kappa::Κ
::&Kcedil::Ķ
::&Kcy::К
::&Kfr::𝔎
::&Kopf::𝕂
::&Kscr::𝒦
::&LJcy::Љ
::&Lacute::Ĺ
::&Lambda::Λ
::&Lang::⟪
::&Larr::↞
::&Lcaron::Ľ
::&Lcedil::Ļ
::&Lcy::Л
::&LeftDownTeeVector::⥡
::&LeftDownVectorBar::⥙
::&LeftRightVector::⥎
::&LeftTeeArrow::↤
::&LeftTeeVector::⥚
::&LeftTriangleBar::⧏
::&LeftUpDownVector::⥑
::&LeftUpTeeVector::⥠
::&LeftUpVectorBar::⥘
::&LeftVectorBar::⥒
::&LessLess::⪡
::&Lfr::𝔏
::&Ll::⋘
::&Lmidot::Ŀ
::&Lopf::𝕃
::&Lscr::ℒ
::&Lstrok::Ł
::&Lt::≪
::&Map::⤅
::&Mcy::М
::&MediumSpace:: 
::&Mfr::𝔐
::&Mopf::𝕄
::&Mu::Μ
::&NJcy::Њ
::&Nacute::Ń
::&Ncaron::Ň
::&Ncedil::Ņ
::&Ncy::Н
::&Nfr::𝔑
::&NoBreak::⁠
::&Nopf::ℕ
::&Not::⫬
::&NotCupCap::≭
::&Nscr::𝒩
::&Ntilde::Ñ
::&Nu::Ν
::&OElig::Œ
::&Oacute::Ó
::&Ocirc::Ô
::&Ocy::О
::&Odblac::Ő
::&Ofr::𝔒
::&Ograve::Ò
::&Omacr::Ō
::&Omega::Ω
::&Omicron::Ο
::&Oopf::𝕆
::&Or::⩔
::&Oscr::𝒪
::&Oslash::Ø
::&Otilde::Õ
::&Otimes::⨷
::&Ouml::Ö
::&OverBrace::⏞
::&OverParenthesis::⏜
::&Pcy::П
::&Pfr::𝔓
::&Phi::Φ
::&Pi::Π
::&Popf::ℙ
::&Pr::⪻
::&Prime::″
::&Pscr::𝒫
::&Psi::Ψ
::&Qfr::𝔔
::&Qscr::𝒬
::&RBarr::⤐
::&Racute::Ŕ
::&Rang::⟫
::&Rarr::↠
::&Rarrtl::⤖
::&Rcaron::Ř
::&Rcedil::Ŗ
::&Rcy::Р
::&Rho::Ρ
::&RightDownTeeVector::⥝
::&RightDownVectorBar::⥕
::&RightTeeVector::⥛
::&RightTriangleBar::⧐
::&RightUpDownVector::⥏
::&RightUpTeeVector::⥜
::&RightUpVectorBar::⥔
::&RightVectorBar::⥓
::&RoundImplies::⥰
::&Rscr::ℛ
::&RuleDelayed::⧴
::&SHCHcy::Щ
::&SHcy::Ш
::&SOFTcy::Ь
::&Sacute::Ś
::&Sc::⪼
::&Scaron::Š
::&Scedil::Ş
::&Scirc::Ŝ
::&Scy::С
::&Sfr::𝔖
::&Sigma::Σ
::&Sopf::𝕊
::&Sscr::𝒮
::&Sub::⋐
::&Sup::⋑
::&THORN::Þ
::&TSHcy::Ћ
::&TScy::Ц
::&Tau::Τ
::&Tcaron::Ť
::&Tcedil::Ţ
::&Tcy::Т
::&Tfr::𝔗
::&Theta::Θ
::&Topf::𝕋
::&Tscr::𝒯
::&Tstrok::Ŧ
::&Uacute::Ú
::&Uarr::↟
::&Uarrocir::⥉
::&Ubrcy::Ў
::&Ubreve::Ŭ
::&Ucirc::Û
::&Ucy::У
::&Udblac::Ű
::&Ufr::𝔘
::&Ugrave::Ù
::&Umacr::Ū
::&UnderBar::̲
::&UnderBrace::⏟
::&UnderParenthesis::⏝
::&Uogon::Ų
::&Uopf::𝕌
::&UpArrowBar::⤒
::&UpTeeArrow::↥
::&Upsi::ϒ
::&Upsilon::Υ
::&Uring::Ů
::&Uscr::𝒰
::&Utilde::Ũ
::&Uuml::Ü
::&VDash::⊫
::&Vbar::⫫
::&Vcy::В
::&Vdash::⊩
::&Vdashl::⫦
::&Verbar::‖
::&VerticalSeparator::❘
::&Vfr::𝔙
::&Vopf::𝕍
::&Vscr::𝒱
::&Vvdash::⊪
::&Wcirc::Ŵ
::&Wfr::𝔚
::&Wopf::𝕎
::&Wscr::𝒲
::&Xfr::𝔛
::&Xi::Ξ
::&Xopf::𝕏
::&Xscr::𝒳
::&YAcy::Я
::&YIcy::Ї
::&YUcy::Ю
::&Yacute::Ý
::&Ycirc::Ŷ
::&Ycy::Ы
::&Yfr::𝔜
::&Yopf::𝕐
::&Yscr::𝒴
::&Yuml::Ÿ
::&ZHcy::Ж
::&Zacute::Ź
::&Zcaron::Ž
::&Zcy::З
::&Zdot::Ż
::&ZeroWidthSpace::​
::&Zeta::Ζ
::&Zfr::ℨ
::&Zscr::𝒵
::&aacute::á
::&abreve::ă
::&ac::∾
::&acaron::ǎ
::&acd::∿
::&acirc::â
::&acute::´
::&acy::а
::&aelig::æ
::&afr::𝔞
::&agrave::à
::&alefsym::ℵ
::&alpha::α
::&amacr::ā
::&amalg::⨿
::&amp::&
::&and::∧
::&andand::⩕
::&andd::⩜
::&andslope::⩘
::&andv::⩚
::&ang::∠
::&ange::⦤
::&angmsd::∡
::&angmsdaa::⦨
::&angmsdab::⦩
::&angmsdac::⦪
::&angmsdad::⦫
::&angmsdae::⦬
::&angmsdaf::⦭
::&angmsdag::⦮
::&angmsdah::⦯
::&angrt::∟
::&angrtvb::⊾
::&angrtvbd::⦝
::&angsph::∢
::&angst::Å
::&angzarr::⍼
::&aogon::ą
::&aopf::𝕒
::&apE::⩰
::&apacir::⩯
::&ape::≊
::&apid::≋
::&apos::'
::&aring::å
::&ascr::𝒶
::&ast::*
::&asymp::≈
::&asympeq::≍
::&atilde::ã
::&auml::ä
::&awconint::∳
::&awint::⨑
::&bNot::⫭
::&barvee::⊽
::&barwed::⌅
::&bbrk::⎵
::&bbrktbrk::⎶
::&bcong::≌
::&bcy::б
::&becaus::∵
::&bemptyv::⦰
::&bepsi::϶
::&bernou::ℬ
::&beta::β
::&beth::ℶ
::&bfr::𝔟
::&blank::␣
::&blk12::▒
::&blk14::░
::&blk34::▓
::&block::█
::&bnot::⌐
::&bopf::𝕓
::&bottom::⊥
::&bowtie::⋈
::&boxDL::╗
::&boxDR::╔
::&boxDl::╖
::&boxDr::╓
::&boxH::═
::&boxHD::╦
::&boxHU::╩
::&boxHd::╤
::&boxHu::╧
::&boxUL::╝
::&boxUR::╚
::&boxUl::╜
::&boxUr::╙
::&boxV::║
::&boxVH::╬
::&boxVL::╣
::&boxVR::╠
::&boxVh::╫
::&boxVl::╢
::&boxVr::╟
::&boxbox::⧉
::&boxdL::╕
::&boxdR::╒
::&boxdl::┐
::&boxdr::┌
::&boxh::─
::&boxhD::╥
::&boxhU::╨
::&boxhd::┬
::&boxhu::┴
::&boxuL::╛
::&boxuR::╘
::&boxul::┘
::&boxur::└
::&boxv::│
::&boxvH::╪
::&boxvL::╡
::&boxvR::╞
::&boxvh::┼
::&boxvl::┤
::&boxvr::├
::&bprime::‵
::&breve::˘
::&brvbar::¦
::&bscr::𝒷
::&bsemi::⁏
::&bsim::∽
::&bsime::⋍
::&bsol::\
::&bsolb::⧅
::&bull::•
::&bump::≎
::&bumpE::⪮
::&bumpe::≏
::&cacute::ć
::&cap::∩
::&capand::⩄
::&capbrcup::⩉
::&capcap::⩋
::&capcup::⩇
::&capdot::⩀
::&caret::⁁
::&caron::ˇ
::&ccaps::⩍
::&ccaron::č
::&ccedil::ç
::&ccirc::ĉ
::&ccups::⩌
::&ccupssm::⩐
::&cdot::ċ
::&cedil::¸
::&cemptyv::⦲
::&cent::¢
::&cfr::𝔠
::&chcy::ч
::&check::✓
::&chi::χ
::&cir::○
::&cirE::⧃
::&circ::ˆ
::&cire::≗
::&cirfnint::⨐
::&cirmid::⫯
::&cirscir::⧂
::&clubs::♣
::&colon:::
::&colone::≔
::&comma::,
::&commat::@
::&comp::∁
::&compfn::∘
::&cong::≅
::&congdot::⩭
::&conint::∮
::&copf::𝕔
::&coprod::∐
::&copy::©
::&copysr::℗
::&crarr::↵
::&cross::✗
::&cscr::𝒸
::&csub::⫏
::&csube::⫑
::&csup::⫐
::&csupe::⫒
::&ctdot::⋯
::&cudarrl::⤸
::&cudarrr::⤵
::&cuepr::⋞
::&cuesc::⋟
::&cularr::↶
::&cularrp::⤽
::&cup::∪
::&cupbrcap::⩈
::&cupcap::⩆
::&cupcup::⩊
::&cupdot::⊍
::&cupor::⩅
::&curarr::↷
::&curarrm::⤼
::&curren::¤
::&cuvee::⋎
::&cuwed::⋏
::&cwconint::∲
::&cwint::∱
::&cylcty::⌭
::&dArr::⇓
::&dHar::⥥
::&dagger::†
::&daleth::ℸ
::&darr::↓
::&dashv::⊣
::&dblac::˝
::&dcaron::ď
::&dcy::д
::&ddarr::⇊
::&deg::°
::&delta::δ
::&demptyv::⦱
::&dfisht::⥿
::&dfr::𝔡
::&dharl::⇃
::&dharr::⇂
::&diam::⋄
::&diams::♦
::&disin::⋲
::&divide::÷
::&divonx::⋇
::&djcy::ђ
::&dlcorn::⌞
::&dlcrop::⌍
::&dollar::$
::&dopf::𝕕
::&dot::˙
::&drcorn::⌟
::&drcrop::⌌
::&dscr::𝒹
::&dscy::ѕ
::&dsol::⧶
::&dstrok::đ
::&dtdot::⋱
::&dtri::▿
::&dtrif::▾
::&duarr::⇵
::&duhar::⥯
::&dwangle::⦦
::&dzcy::џ
::&dzigrarr::⟿
::&eDDot::⩷
::&eDot::≑
::&eacute::é
::&easter::⩮
::&ecaron::ě
::&ecir::≖
::&ecirc::ê
::&ecolon::≕
::&ecy::э
::&edot::ė
::&efDot::≒
::&efr::𝔢
::&eg::⪚
::&egrave::è
::&egs::⪖
::&egsdot::⪘
::&el::⪙
::&elinters::⏧
::&ell::ℓ
::&els::⪕
::&elsdot::⪗
::&emacr::ē
::&empty::∅
::&emsp:: 
::&emsp13:: 
::&emsp14:: 
::&eng::ŋ
::&ensp:: 
::&eogon::ę
::&eopf::𝕖
::&epar::⋕
::&eparsl::⧣
::&eplus::⩱
::&epsi::ϵ
::&epsiv::ε
::&equest::≟
::&equiv::≡
::&equivDD::⩸
::&eqvparsl::⧥
::&erDot::≓
::&erarr::⥱
::&escr::ℯ
::&esdot::≐
::&esim::≂
::&eta::η
::&eth::ð
::&euml::ë
::&euro::€
::&excl::!
::&exist::∃
::&fcy::ф
::&female::♀
::&ffilig::ﬃ
::&fflig::ﬀ
::&ffllig::ﬄ
::&ffr::𝔣
::&filig::ﬁ
::&flat::♭
::&fllig::ﬂ
::&fltns::▱
::&fnof::ƒ
::&fopf::𝕗
::&forall::∀
::&fork::⋔
::&forkv::⫙
::&fpartint::⨍
::&frac12::½
::&frac13::⅓
::&frac14::¼
::&frac15::⅕
::&frac16::⅙
::&frac18::⅛
::&frac23::⅔
::&frac25::⅖
::&frac34::¾
::&frac35::⅗
::&frac38::⅜
::&frac45::⅘
::&frac56::⅚
::&frac58::⅝
::&frac78::⅞
::&frasl::⁄
::&frown::⌢
::&fscr::𝒻
::&gE::≧
::&gEl::⪌
::&gacute::ǵ
::&gamma::γ
::&gammad::ϝ
::&gap::⪆
::&gbreve::ğ
::&gcirc::ĝ
::&gcy::г
::&gdot::ġ
::&ge::≥
::&gel::⋛
::&ges::⩾
::&gescc::⪩
::&gesdot::⪀
::&gesdoto::⪂
::&gesdotol::⪄
::&gesles::⪔
::&gfr::𝔤
::&gimel::ℷ
::&gjcy::ѓ
::&gl::≷
::&glE::⪒
::&gla::⪥
::&glj::⪤
::&gnE::≩
::&gnap::⪊
::&gne::⪈
::&gnsim::⋧
::&gopf::𝕘
::&grave::`
::&gscr::ℊ
::&gsim::≳
::&gsime::⪎
::&gsiml::⪐
::&gt::>
::&gtcc::⪧
::&gtcir::⩺
::&gtdot::⋗
::&gtlPar::⦕
::&gtquest::⩼
::&gtrarr::⥸
::&hArr::⇔
::&hairsp:: 
::&hamilt::ℋ
::&hardcy::ъ
::&harr::↔
::&harrcir::⥈
::&harrw::↭
::&hcirc::ĥ
::&hearts::♥
::&hellip::…
::&hercon::⊹
::&hfr::𝔥
::&hoarr::⇿
::&homtht::∻
::&hopf::𝕙
::&horbar::―
::&hscr::𝒽
::&hstrok::ħ
::&hybull::⁃
::&hyphen::‐
::&iacute::í
::&icirc::î
::&icy::и
::&iecy::е
::&iexcl::¡
::&ifr::𝔦
::&igrave::ì
::&iinfin::⧜
::&iiota::℩
::&ijlig::ĳ
::&imacr::ī
::&image::ℑ
::&imath::ı
::&imof::⊷
::&imped::Ƶ
::&incare::℅
::&infin::∞
::&infintie::⧝
::&int::∫
::&intcal::⊺
::&integers::ℤ
::&intlarhk::⨗
::&iocy::ё
::&iogon::į
::&iopf::𝕚
::&iota::ι
::&iprod::⨼
::&iquest::¿
::&iscr::𝒾
::&isin::∈
::&isinE::⋹
::&isindot::⋵
::&isins::⋴
::&isinsv::⋳
::&itilde::ĩ
::&iukcy::і
::&iuml::ï
::&jcirc::ĵ
::&jcy::й
::&jfr::𝔧
::&jmath::ȷ
::&jopf::𝕛
::&jscr::𝒿
::&jsercy::ј
::&jukcy::є
::&kappa::κ
::&kappav::ϰ
::&kcedil::ķ
::&kcy::к
::&kfr::𝔨
::&kgreen::ĸ
::&khcy::х
::&kjcy::ќ
::&kopf::𝕜
::&kscr::𝓀
::&lAarr::⇚
::&lArr::⇐
::&lAtail::⤛
::&lBarr::⤎
::&lE::≦
::&lEg::⪋
::&lHar::⥢
::&lacute::ĺ
::&laemptyv::⦴
::&lambda::λ
::&lang::⟨
::&langd::⦑
::&lap::⪅
::&laquo::«
::&larr::←
::&larrb::⇤
::&larrbfs::⤟
::&larrfs::⤝
::&larrhk::↩
::&larrlp::↫
::&larrpl::⤹
::&larrsim::⥳
::&larrtl::↢
::&lat::⪫
::&latail::⤙
::&late::⪭
::&lbarr::⤌
::&lbbrk::❲
::&lbrke::⦋
::&lbrksld::⦏
::&lbrkslu::⦍
::&lcaron::ľ
::&lcedil::ļ
::&lceil::⌈
::&lcub::{
::&lcy::л
::&ldca::⤶
::&ldquo::“
::&ldquor::„
::&ldrdhar::⥧
::&ldrushar::⥋
::&ldsh::↲
::&le::≤
::&leg::⋚
::&les::⩽
::&lescc::⪨
::&lesdot::⩿
::&lesdoto::⪁
::&lesdotor::⪃
::&lesges::⪓
::&lfisht::⥼
::&lfloor::⌊
::&lfr::𝔩
::&lg::≶
::&lgE::⪑
::&lhard::↽
::&lharu::↼
::&lharul::⥪
::&lhblk::▄
::&ljcy::љ
::&llarr::⇇
::&llhard::⥫
::&lltri::◺
::&lmidot::ŀ
::&lmoust::⎰
::&lnE::≨
::&lnap::⪉
::&lne::⪇
::&lnsim::⋦
::&loang::⟬
::&loarr::⇽
::&lobrk::⟦
::&lopar::⦅
::&lopf::𝕝
::&loplus::⨭
::&lotimes::⨴
::&lowast::∗
::&lowbar::_
::&loz::◊
::&lozf::⧫
::&lpar::(
::&lparlt::⦓
::&lrarr::⇆
::&lrhar::⇋
::&lrhard::⥭
::&lrm::‎
::&lrtri::⊿
::&lsaquo::‹
::&lscr::𝓁
::&lsh::↰
::&lsim::≲
::&lsime::⪍
::&lsimg::⪏
::&lsqb::[
::&lsquo::‘
::&lsquor::‚
::&lstrok::ł
::&ltcc::⪦
::&ltcir::⩹
::&ltdot::⋖
::&lthree::⋋
::&ltimes::⋉
::&ltlarr::⥶
::&ltquest::⩻
::&ltrPar::⦖
::&ltri::◃
::&ltrie::⊴
::&ltrif::◂
::&lurdshar::⥊
::&luruhar::⥦
::&mDDot::∺
::&macr::¯
::&male::♂
::&malt::✠
::&map::↦
::&marker::▮
::&mcomma::⨩
::&mcy::м
::&mdash::—
::&mfr::𝔪
::&mho::℧
::&micro::µ
::&mid::∣
::&midcir::⫰
::&middot::·
::&minus::−
::&minusb::⊟
::&minusd::∸
::&minusdu::⨪
::&mlcp::⫛
::&mnplus::∓
::&models::⊧
::&mopf::𝕞
::&mscr::𝓂
::&mu::μ
::&mumap::⊸
::&nVDash::⊯
::&nVdash::⊮
::&nabla::∇
::&nacute::ń
::&nap::≉
::&napos::ŉ
::&natur::♮
::&nbsp:: 
::&ncap::⩃
::&ncaron::ň
::&ncedil::ņ
::&ncong::≇
::&ncup::⩂
::&ncy::н
::&ndash::–
::&ne::≠
::&neArr::⇗
::&nearhk::⤤
::&nearr::↗
::&nequiv::≢
::&nesear::⤨
::&nexist::∄
::&nfr::𝔫
::&nge::≱
::&ngsim::≵
::&ngt::≯
::&nhArr::⇎
::&nharr::↮
::&nhpar::⫲
::&nis::⋼
::&nisd::⋺
::&niv::∋
::&njcy::њ
::&nlArr::⇍
::&nlarr::↚
::&nldr::‥
::&nle::≰
::&nlsim::≴
::&nlt::≮
::&nltri::⋪
::&nltrie::⋬
::&nmid::∤
::&nopf::𝕟
::&not::¬
::&notin::∉
::&notinvb::⋷
::&notinvc::⋶
::&notni::∌
::&notnivb::⋾
::&notnivc::⋽
::&npar::∦
::&npolint::⨔
::&npr::⊀
::&nprcue::⋠
::&nrArr::⇏
::&nrarr::↛
::&nrtri::⋫
::&nrtrie::⋭
::&nsc::⊁
::&nsccue::⋡
::&nscr::𝓃
::&nsim::≁
::&nsime::≄
::&nsqsube::⋢
::&nsqsupe::⋣
::&nsub::⊄
::&nsube::⊈
::&nsup::⊅
::&nsupe::⊉
::&ntgl::≹
::&ntilde::ñ
::&ntlg::≸
::&nu::ν
::&num::#
::&numero::№
::&numsp:: 
::&nvDash::⊭
::&nvHarr::⤄
::&nvdash::⊬
::&nvinfin::⧞
::&nvlArr::⤂
::&nvrArr::⤃
::&nwArr::⇖
::&nwarhk::⤣
::&nwarr::↖
::&nwnear::⤧
::&oS::Ⓢ
::&oacute::ó
::&oast::⊛
::&ocir::⊚
::&ocirc::ô
::&ocy::о
::&odash::⊝
::&odblac::ő
::&odiv::⨸
::&odot::⊙
::&odsold::⦼
::&oelig::œ
::&ofcir::⦿
::&ofr::𝔬
::&ogon::˛
::&ograve::ò
::&ogt::⧁
::&ohbar::⦵
::&ohm::Ω
::&olarr::↺
::&olcir::⦾
::&olcross::⦻
::&oline::‾
::&olt::⧀
::&omacr::ō
::&omega::ω
::&omicron::ο
::&omid::⦶
::&ominus::⊖
::&oopf::𝕠
::&opar::⦷
::&operp::⦹
::&oplus::⊕
::&or::∨
::&orarr::↻
::&ord::⩝
::&order::ℴ
::&ordf::ª
::&ordm::º
::&origof::⊶
::&oror::⩖
::&orslope::⩗
::&orv::⩛
::&oslash::ø
::&osol::⊘
::&otilde::õ
::&otimes::⊗
::&otimesas::⨶
::&ouml::ö
::&ovbar::⌽
::&par::∥
::&para::¶
::&parsim::⫳
::&parsl::⫽
::&part::∂
::&pcy::п
::&percnt::%
::&period::.
::&permil::‰
::&pertenk::‱
::&pfr::𝔭
::&phi::φ
::&phmmat::ℳ
::&phone::☎
::&pi::π
::&piv::ϖ
::&planck::ℏ
::&planckh::ℎ
::&plus::+
::&plusacir::⨣
::&plusb::⊞
::&pluscir::⨢
::&plusdo::∔
::&plusdu::⨥
::&pluse::⩲
::&plusmn::±
::&plussim::⨦
::&plustwo::⨧
::&pointint::⨕
::&popf::𝕡
::&pound::£
::&pr::≺
::&prE::⪳
::&prap::⪷
::&prcue::≼
::&pre::⪯
::&prime::′
::&prnE::⪵
::&prnap::⪹
::&prnsim::⋨
::&prod::∏
::&profalar::⌮
::&profline::⌒
::&profsurf::⌓
::&prop::∝
::&prsim::≾
::&prurel::⊰
::&pscr::𝓅
::&psi::ψ
::&puncsp:: 
::&qfr::𝔮
::&qint::⨌
::&qopf::𝕢
::&qprime::⁗
::&qscr::𝓆
::&quaternions::ℍ
::&quatint::⨖
::&quest::?
::&quot::"
::&rAarr::⇛
::&rArr::⇒
::&rAtail::⤜
::&rBarr::⤏
::&rHar::⥤
::&race::⧚
::&racute::ŕ
::&radic::√
::&raemptyv::⦳
::&rang::⟩
::&rangd::⦒
::&range::⦥
::&raquo::»
::&rarr::→
::&rarrap::⥵
::&rarrb::⇥
::&rarrbfs::⤠
::&rarrc::⤳
::&rarrfs::⤞
::&rarrhk::↪
::&rarrlp::↬
::&rarrpl::⥅
::&rarrsim::⥴
::&rarrtl::↣
::&rarrw::↝
::&ratail::⤚
::&ratio::∶
::&rationals::ℚ
::&rbarr::⤍
::&rbbrk::❳
::&rbrke::⦌
::&rbrksld::⦎
::&rbrkslu::⦐
::&rcaron::ř
::&rcedil::ŗ
::&rceil::⌉
::&rcub::}
::&rcy::р
::&rdca::⤷
::&rdldhar::⥩
::&rdquo::”
::&rdsh::↳
::&real::ℜ
::&reals::ℝ
::&rect::▭
::&reg::®
::&rfisht::⥽
::&rfloor::⌋
::&rfr::𝔯
::&rhard::⇁
::&rharu::⇀
::&rharul::⥬
::&rho::ρ
::&rhov::ϱ
::&ring::˚
::&rlarr::⇄
::&rlhar::⇌
::&rlm::‏
::&rmoust::⎱
::&rnmid::⫮
::&roang::⟭
::&roarr::⇾
::&robrk::⟧
::&ropar::⦆
::&ropf::𝕣
::&roplus::⨮
::&rotimes::⨵
::&rpar::)
::&rpargt::⦔
::&rppolint::⨒
::&rrarr::⇉
::&rsaquo::›
::&rscr::𝓇
::&rsh::↱
::&rsqb::]
::&rsquo::’
::&rthree::⋌
::&rtimes::⋊
::&rtri::▹
::&rtrie::⊵
::&rtrif::▸
::&rtriltri::⧎
::&ruluhar::⥨
::&rx::℞
::&sacute::ś
::&sc::≻
::&scE::⪴
::&scap::⪸
::&scaron::š
::&sccue::≽
::&sce::⪰
::&scedil::ş
::&scirc::ŝ
::&scnE::⪶
::&scnap::⪺
::&scnsim::⋩
::&scpolint::⨓
::&scsim::≿
::&scy::с
::&sdot::⋅
::&sdotb::⊡
::&sdote::⩦
::&seArr::⇘
::&searhk::⤥
::&searr::↘
::&sect::§
::&semi::&
::&seswar::⤩
::&setmn::∖
::&sext::✶
::&sfr::𝔰
::&sharp::♯
::&shchcy::щ
::&shcy::ш
::&shy::­
::&sigma::σ
::&sigmav::ς
::&sim::∼
::&simdot::⩪
::&sime::≃
::&simg::⪞
::&simgE::⪠
::&siml::⪝
::&simlE::⪟
::&simne::≆
::&simplus::⨤
::&simrarr::⥲
::&smashp::⨳
::&smeparsl::⧤
::&smile::⌣
::&smt::⪪
::&smte::⪬
::&softcy::ь
::&sol::/
::&solb::⧄
::&solbar::⌿
::&sopf::𝕤
::&spades::♠
::&sqcap::⊓
::&sqcup::⊔
::&sqsub::⊏
::&sqsube::⊑
::&sqsup::⊐
::&sqsupe::⊒
::&squ::□
::&squf::▪
::&sscr::𝓈
::&sstarf::⋆
::&star::☆
::&starf::★
::&straightphi::ϕ
::&sub::⊂
::&subE::⫅
::&subdot::⪽
::&sube::⊆
::&subedot::⫃
::&submult::⫁
::&subnE::⫋
::&subne::⊊
::&subplus::⪿
::&subrarr::⥹
::&subsim::⫇
::&subsub::⫕
::&subsup::⫓
::&sum::∑
::&sung::♪
::&sup::⊃
::&sup1::¹
::&sup2::²
::&sup3::³
::&supE::⫆
::&supdot::⪾
::&supdsub::⫘
::&supe::⊇
::&supedot::⫄
::&suphsub::⫗
::&suplarr::⥻
::&supmult::⫂
::&supnE::⫌
::&supne::⊋
::&supplus::⫀
::&supsim::⫈
::&supsub::⫔
::&supsup::⫖
::&swArr::⇙
::&swarhk::⤦
::&swarr::↙
::&swnwar::⤪
::&szlig::ß
::&target::⌖
::&tau::τ
::&tbrk::⎴
::&tcaron::ť
::&tcedil::ţ
::&tcy::т
::&tdot::⃛
::&telrec::⌕
::&tfr::𝔱
::&there4::∴
::&theta::θ
::&thetav::ϑ
::&thinsp:: 
::&thorn::þ
::&tilde::˜
::&times::×
::&timesb::⊠
::&timesbar::⨱
::&timesd::⨰
::&tint::∭
::&top::⊤
::&topbot::⌶
::&topcir::⫱
::&topf::𝕥
::&topfork::⫚
::&tprime::‴
::&trade::™
::&tridot::◬
::&trie::≜
::&triminus::⨺
::&triplus::⨹
::&trisb::⧍
::&tritime::⨻
::&trpezium::⏢
::&tscr::𝓉
::&tscy::ц
::&tshcy::ћ
::&tstrok::ŧ
::&twixt::≬
::&uArr::⇑
::&uHar::⥣
::&uacute::ú
::&uarr::↑
::&ubrcy::ў
::&ubreve::ŭ
::&ucirc::û
::&ucy::у
::&udarr::⇅
::&udblac::ű
::&udhar::⥮
::&ufisht::⥾
::&ufr::𝔲
::&ugrave::ù
::&uharl::↿
::&uharr::↾
::&uhblk::▀
::&ulcorn::⌜
::&ulcrop::⌏
::&ultri::◸
::&umacr::ū
::&uogon::ų
::&uopf::𝕦
::&uplus::⊎
::&upsi::υ
::&urcorn::⌝
::&urcrop::⌎
::&uring::ů
::&urtri::◹
::&uscr::𝓊
::&utdot::⋰
::&utilde::ũ
::&utri::▵
::&utrif::▴
::&uuarr::⇈
::&uuml::ü
::&uwangle::⦧
::&vArr::⇕
::&vBar::⫨
::&vBarv::⫩
::&vDash::⊨
::&vangrt::⦜
::&varr::↕
::&vcy::в
::&vdash::⊢
::&veebar::⊻
::&veeeq::≚
::&vellip::⋮
::&verbar::|
::&vfr::𝔳
::&vltri::⊲
::&vopf::𝕧
::&vrtri::⊳
::&vscr::𝓋
::&vzigzag::⦚
::&wcirc::ŵ
::&wedbar::⩟
::&wedgeq::≙
::&weierp::℘
::&wfr::𝔴
::&wopf::𝕨
::&wreath::≀
::&wscr::𝓌
::&xcap::⋂
::&xcirc::◯
::&xcup::⋃
::&xdtri::▽
::&xfr::𝔵
::&xhArr::⟺
::&xharr::⟷
::&xi::ξ
::&xlArr::⟸
::&xlarr::⟵
::&xmap::⟼
::&xnis::⋻
::&xodot::⨀
::&xopf::𝕩
::&xoplus::⨁
::&xotime::⨂
::&xrArr::⟹
::&xrarr::⟶
::&xscr::𝓍
::&xsqcup::⨆
::&xuplus::⨄
::&xutri::△
::&xvee::⋁
::&xwedge::⋀
::&yacute::ý
::&yacy::я
::&ycirc::ŷ
::&ycy::ы
::&yen::¥
::&yfr::𝔶
::&yicy::ї
::&yopf::𝕪
::&yscr::𝓎
::&yucy::ю
::&yuml::ÿ
::&zacute::ź
::&zcaron::ž
::&zcy::з
::&zdot::ż
::&zeta::ζ
::&zfr::𝔷
::&zhcy::ж
::&zigrarr::⇝
::&zopf::𝕫
::&zscr::𝓏
::&zwj::‍
::&zwnj::‌
