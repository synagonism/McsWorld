; comments
; version {2026-04-04}
#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
; #Warn  ; Enable warnings to assist with detecting common errors.
SetWorkingDir C:\xampp\htdocs\dWstSgm  ; Ensures a consistent starting directory.
#Hotstring c  ; makes scripts case-sensitive

;;;;;;;;; NOTATIONS ;;;;;;;;;;;;;
; CUSTOM notation begin with :
; NUMBER notation begin with ii
; TeX notation begin with    \
; HTML notation begin with   &
; GREEK-ANCIENT ''greek-keyboard
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
:::dh::δ
:::th::θ
:::lrr::⟨
:::lrl::⟩

:::aac::á
:::aaa::á
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
:::eee::é
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
:::iii::í
:::iac::í
:::icf::ǐ
:::igr::ì
:::idb::ị
:::idl::ı
:::ihk::ỉ
:::itl::ĩ
:::ium::ï

:::oac::ó
:::ooo::ó
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
:::uuu::ú
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
:::ccr::č

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
:::Scb::Ș
:::scb::ș
:::scr::š
:::sdb::ṣ

:::Tcb::Ț
:::tcb::ț
:::tlb::ṯ
:::tdb::ṭ

:::zdb::ẓ
:::zcr::ž

:::fg1::ʻ  ;; pharyngeal
:::fg2::ʕ
:::fg3::ˤ

:::euro::€

:::sentence::·

:::ZhonFullstop::。

:::Xdouble::𝕏

:::xdouble::𝕩


;;;;;;;;;;;;;;;;;;;; GREEK-ANCIENT
;; [ Ψιλή
;; ] Δασεία
;; { Οξεία
;; } Περισπωμένη
;; \ Βαρεία
;; | Υπογεγραμμένη
;; ( βΡαχύ
;; ) Μακρό
;; : Διαλυτικά
::''ΑΒ::Ὰ   ;; char.8122
::''ΑΔ::Ἁ   ;; char.7945
::''ΑΔΒ::Ἃ   ;; char.7947
::''ΑΔΒΥ::ᾋ   ;; char.8075
::''ΑΔΟ::Ἅ   ;; char.7949
::''ΑΔΟΥ::ᾍ   ;; char.8077
::''ΑΔΠ::Ἇ   ;; char.7951
::''ΑΔΠΥ::ᾏ   ;; char.8079
::''ΑΔΥ::ᾉ   ;; char.8073
::''ΑΜ::Ᾱ   ;; char.8121
::''ΑΟ::Ά   ;; char.8123
::''ΑΡ::Ᾰ   ;; char.8120
::''ΑΥ::ᾼ   ;; char.8124
::''ΑΨ::Ἀ   ;; char.7944
::''ΑΨΒ::Ἂ   ;; char.7946
::''ΑΨΒΥ::ᾊ   ;; char.8074
::''ΑΨΟ::Ἄ   ;; char.7948
::''ΑΨΟΥ::ᾌ   ;; char.8076
::''ΑΨΠ::Ἆ   ;; char.7950
::''ΑΨΠΥ::ᾎ   ;; char.8078
::''ΑΨΥ::ᾈ   ;; char.8072
::''ΕΒ::Ὲ   ;; char.8136
::''ΕΔ::Ἑ   ;; char.7961
::''ΕΔΒ::Ἓ   ;; char.7963
::''ΕΔΟ::Ἕ   ;; char.7965
::''ΕΟ::Έ   ;; char.8137
::''ΕΨ::Ἐ   ;; char.7960
::''ΕΨ::Ἒ   ;; char.7962
::''ΕΨΟ::Ἔ   ;; char.7964
::''ΗΒ::Ὴ   ;; char.8138
::''ΗΔ::Ἡ   ;; char.7977
::''ΗΔΒ::Ἣ   ;; char.7979
::''ΗΔΒΥ::ᾛ   ;; char.8091
::''ΗΔΟ::Ἥ   ;; char.7981
::''ΗΔΟΥ::ᾝ   ;; char.8093
::''ΗΔΠ::Ἧ   ;; char.7983
::''ΗΔΠΥ::ᾟ   ;; char.8095
::''ΗΔΥ::ᾙ   ;; char.8089
::''ΗΟ::Ή   ;; char.8139
::''ΗΥ::ῌ   ;; char.8140
::''ΗΨ::Ἠ   ;; char.7976
::''ΗΨ::Ἢ   ;; char.7978
::''ΗΨΒΥ::ᾚ   ;; char.8090
::''ΗΨΟ::Ἤ   ;; char.7980
::''ΗΨΟΥ::ᾜ   ;; char.8092
::''ΗΨΠ::Ἦ   ;; char.7982
::''ΗΨΠΥ::ᾞ   ;; char.8094
::''ΗΨΥ::ᾘ   ;; char.8088
::''ΙΒ::Ὶ   ;; char.8154
::''ΙΔ::Ἱ   ;; char.7993
::''ΙΔΒ::Ἳ   ;; char.7995
::''ΙΔΟ::Ἵ   ;; char.7997
::''ΙΔΠ::Ἷ   ;; char.7999
::''ΙΜ::Ῑ   ;; char.8153
::''ΙΟ::Ί   ;; char.8155 with oksia
::''ΙΡ::Ῐ   ;; char.8152
::''ΙΨ::Ἰ   ;; char.7992
::''ΙΨΒ::Ἲ   ;; char.7994
::''ΙΨΟ::Ἴ   ;; char.7996
::''ΙΨΠ::Ἶ   ;; char.7998
::''ΟΒ::Ὸ   ;; char.8184
::''ΟΔ::Ὁ   ;; char.8009
::''ΟΔΒ::Ὃ   ;; char.8011
::''ΟΔΟ::Ὅ   ;; char.8013
::''ΟΟ::Ό   ;; char.8185
::''ΟΨ::Ὀ   ;; char.8008
::''ΟΨΒ::Ὂ   ;; char.8010
::''ΟΨΟ::Ὄ   ;; char.8012
::''ΡΔ::Ῥ   ;; char.8172
::''ΥΒ::Ὺ   ;; char.8170
::''ΥΔ::Ὑ   ;; char.8025
::''ΥΔΒ::Ὓ   ;; char.8027
::''ΥΔΟ::Ὕ   ;; char.8029
::''ΥΔΠ::Ὗ   ;; char.8031
::''ΥΜ::Ῡ   ;; char.8169
::''ΥΟ::Ύ   ;; char.8171
::''ΥΡ::Ῠ   ;; char.8168
::''ΩΒ::Ὼ   ;; char.8186
::''ΩΔ::Ὡ   ;; char.8041
::''ΩΔΒ::Ὣ   ;; char.8043
::''ΩΔΒΥ::ᾫ   ;; char.8107
::''ΩΔΟ::Ὥ   ;; char.8045
::''ΩΔΟΥ::ᾭ   ;; char.8109
::''ΩΔΠ::Ὧ   ;; char.8047
::''ΩΔΠΥ::ᾯ   ;; char.8111
::''ΩΔΥ::ᾩ   ;; char.8105
::''ΩΟ::Ώ   ;; char.8187
::''ΩΥ::ῼ   ;; char.8188
::''ΩΨ::Ὠ   ;; char.8040
::''ΩΨΒ::Ὢ   ;; char.8042
::''ΩΨΒΥ::ᾪ   ;; char.8106
::''ΩΨΟ::Ὤ   ;; char.8044
::''ΩΨΟΥ::ᾬ   ;; char.8108
::''ΩΨΠ::Ὦ   ;; char.8046
::''ΩΨΠΥ::ᾮ   ;; char.8110
::''ΩΨΥ::ᾨ   ;; char.8104
::''αΒ::ὰ   ;; char.8048
::''αΒΥ::ᾲ   ;; char.8114
::''αΔ::ἁ   ;; char.7937
::''αΔΒ::ἃ   ;; char.7939
::''αΔΒΥ::ᾃ   ;; char.8067
::''αΔΟ::ἅ   ;; char.7941
::''αΔΟΥ::ᾅ   ;; char.8069
::''αΔΠ::ἇ   ;; char.7943
::''αΔΠΥ::ᾇ   ;; char.8071
::''αΔΥ::ᾁ   ;; char.8065
::''αΜ::ᾱ   ;; char.8113
::''αΟ::ά   ;; char.8049
::''αΟΥ::ᾴ   ;; char.8116
::''αΠ::ᾶ   ;; char.8118
::''αΠΥ::ᾷ   ;; char.8119
::''αΡ::ᾰ   ;; char.8112
::''αΥ::ᾳ   ;; char.8115
::''αΨ::ἀ   ;; char.7936
::''αΨΒ::ἂ   ;; char.7938
::''αΨΒΥ::ᾂ   ;; char.8066
::''αΨΟ::ἄ   ;; char.7940
::''αΨΟΥ::ᾄ   ;; char.8068
::''αΨΠ::ἆ   ;; char.7942
::''αΨΠΥ::ᾆ   ;; char.8070
::''αΨΥ::ᾀ   ;; char.8064
::''εΒ::ὲ   ;; char.8050
::''εΔ::ἑ   ;; char.7953
::''εΔΒ::ἓ   ;; char.7955
::''εΔΟ::ἕ   ;; char.7957
::''εΟ::έ   ;; char.8051
::''εΟΒ::ἒ   ;; char.7954
::''εΨ::ἐ   ;; char.7952
::''εΨΟ::ἔ   ;; char.7956
::''ηΒ::ὴ   ;; char.8052
::''ηΒΥ::ῂ   ;; char.8130
::''ηΔ::ἡ   ;; char.7969
::''ηΔΒ::ἣ   ;; char.7971
::''ηΔΒΥ::ᾓ   ;; char.8083
::''ηΔΟ::ἥ   ;; char.7973
::''ηΔΟΥ::ᾕ   ;; char.8085
::''ηΔΠ::ἧ   ;; char.7975
::''ηΔΠΥ::ᾗ   ;; char.8087
::''ηΔΥ::ᾑ   ;; char.8081
::''ηΟ::ή   ;; char.8053
::''ηΟΥ::ῄ   ;; char.8132
::''ηΠ::ῆ   ;; char.8134
::''ηΠΥ::ῇ   ;; char.8135
::''ηΥ::ῃ   ;; char.8131
::''ηΨ::ἠ   ;; char.7968
::''ηΨΒΥ::ᾒ   ;; char.8082
::''ηΨΟ::ἢ   ;; char.7970
::''ηΨΟ::ἤ   ;; char.7972
::''ηΨΟΥ::ᾔ   ;; char.8084
::''ηΨΠ::ἦ   ;; char.7974
::''ηΨΠΥ::ᾖ   ;; char.8086
::''ηΨΥ::ᾐ   ;; char.8080
::''ιΒ:::ῒ   ;; char.8146
::''ιΒ::ὶ   ;; char.8054
::''ιΔ::ἱ   ;; char.7985
::''ιΔΒ::ἳ   ;; char.7987
::''ιΔΟ::ἵ   ;; char.7989
::''ιΔΠ::ἷ   ;; char.7991
::''ιΜ::ῑ   ;; char.8145
::''ιΟ:::ΐ   ;; char.8147
::''ιΟ::ί   ;; char.8055
::''ιΠ:::ῗ   ;; char.8151
::''ιΠ::ῖ   ;; char.8150
::''ιΡ::ῐ   ;; char.8144
::''ιΨ::ἰ   ;; char.7984
::''ιΨΒ::ἲ   ;; char.7986
::''ιΨΟ::ἴ   ;; char.7988
::''ιΨΠ::ἶ   ;; char.7990
::''οΒ::ὸ   ;; char.8056
::''οΔ::ὁ   ;; char.8001
::''οΔΒ::ὃ   ;; char.8003
::''οΔΟ::ὅ   ;; char.8005
::''οΟ::ό   ;; char.8057
::''οΨ::ὀ   ;; char.8000
::''οΨΒ::ὂ   ;; char.8002
::''οΨΟ::ὄ   ;; char.8004
::''ρΔ::ῥ   ;; char.8165
::''ρΨ::ῤ   ;; char.8164
::''υΒ:::ῢ   ;; char.8162
::''υΒ::ὺ   ;; char.8058
::''υΔ::ὑ   ;; char.8017
::''υΔΒ::ὓ   ;; char.8019
::''υΔΟ::ὕ   ;; char.8021
::''υΔΠ::ὗ   ;; char.8023
::''υΜ::ῡ   ;; char.8161
::''υΟ:::ΰ   ;; char.8163
::''υΟ::ύ   ;; char.8059
::''υΠ:::ῧ   ;; char.8167
::''υΠ::ῦ   ;; char.8166
::''υΡ::ῠ   ;; char.8160
::''υΨ::ὐ   ;; char.8016
::''υΨΒ::ὒ   ;; char.8018
::''υΨΟ::ὔ   ;; char.8020
::''υΨΠ::ὖ   ;; char.8022
::''ωΒ::ὼ   ;; char.8060
::''ωΒΥ::ῲ   ;; char.8178
::''ωΔ::ὡ   ;; char.8033
::''ωΔΒ::ὣ   ;; char.8035
::''ωΔΒΠ::ᾣ   ;; char.8099
::''ωΔΟ::ὥ   ;; char.8037
::''ωΔΟΥ::ᾥ   ;; char.8101
::''ωΔΠ::ὧ   ;; char.8039
::''ωΔΠΥ::ᾧ   ;; char.8103
::''ωΔΥ::ᾡ   ;; char.8097
::''ωΠ::ῶ   ;; char.8182
::''ωΠΥ::ῷ   ;; char.8183
::''ωΥ::ῳ   ;; char.8179
::''ωΨ::ὠ   ;; char.8032
::''ωΨ::ώ   ;; char.8061
::''ωΨΒ::ὢ   ;; char.8034
::''ωΨΒΥ::ᾢ   ;; char.8098
::''ωΨΟ::ὤ   ;; char.8036
::''ωΨΟΥ::ᾤ   ;; char.8100
::''ωΨΠ::ὦ   ;; char.8038
::''ωΨΠΥ::ᾦ   ;; char.8102
::''ωΨΥ::ᾠ   ;; char.8096
::''ωΨΥ::ῴ   ;; char.8180
;;Ά  ;; char.902
;;Έ   ;; char.904
;;Ή   ;; char.905
;;Ί   ;; char.906 with tonos
;;Ό   ;; char.908
;;Ύ   ;; char.910
;;Ώ   ;; char.911
;;Α   ;; char.913
;;Β   ;; char.914
;;Γ   ;; char.915
;;Δ   ;; char.916
;;Ε   ;; char.917
;;Ζ   ;; char.918
;;Η   ;; char.919
;;Θ   ;; char.920
;;Ι   ;; char.921
;;Κ   ;; char.922
;;Λ   ;; char.923
;;Μ   ;; char.924
;;Ν   ;; char.925
;;Ξ   ;; char.926
;;Ο   ;; char.927
;;Π   ;; char.928
;;Ρ   ;; char.929
;;Σ   ;; char.931
;;Τ   ;; char.932
;;Υ   ;; char.933
;;Φ   ;; char.934
;;Χ   ;; char.935
;;Ψ   ;; char.936
;;Ω   ;; char.937
;;ά   ;; char.940
;;έ   ;; char.941
;;ή   ;; char.942
;;ί   ;; char.943
;;α   ;; char.945
;;β   ;; char.946
;;γ   ;; char.947
;;δ   ;; char.948
;;ε   ;; char.949
;;ζ   ;; char.950
;;η   ;; char.951
;;θ   ;; char.952
;;ι   ;; char.953
;;κ   ;; char.954
;;λ   ;; char.955
;;μ   ;; char.956
;;ν   ;; char.957
;;ξ   ;; char.958
;;ο   ;; char.959
;;π   ;; char.960
;;ρ   ;; char.961
;;σ   ;; char.963
;;τ   ;; char.964
;;υ   ;; char.965
;;φ   ;; char.966
;;χ   ;; char.967
;;ψ   ;; char.968
;;ω   ;; char.969
;;ό   ;; char.972
;;ύ   ;; char.973
;;ώ   ;; char.974


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
::''Th::Ћ		;;Soft "t" sound, unique to Serbian
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
::''Dz::Џ		;;Serbian
::''dz::џ
::''Hd::Ъ		;; hard modifier
::''hd::ъ
::''Ib::Ы		;; i back
::''ib::ы
::''Sf::Ь		;; soft modifier
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


;;;;;;;;;;; HTML-NOTATION with its Unicode counterparts
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

;;;;;;;;;;;;;;;;;;;;;; INTEGER CODEPOINT ;;;;;;;;;;;;;;;;;;;;;

;; 0..127|U+0000..U+007F-Basic-Latin
::ii97::a
::ii100::d
::ii122::z
::ii123::{
::ii124::|
::ii125::}
::ii126::~
::ii127::   ;; control.DELETE

::ii128::.   ;; 128..255 ...-Latin-1-Supplement
::ii183::·
::ii200::È
::ii215::×
::ii255::ÿ

::ii256::Ā   ;; 256..383 Ā..ſ-Latin-Extended-A
::ii300::Ĭ
::ii305::ı
::ii383::ſ

::ii384::ƀ   ;; 384..591 ƀ..ɏ-Latin-Extended-B
::ii591::ɏ

::ii592::ɐ   ;; 592..687 ɐ..ʯ-IPA-Extensions
::ii687::ʯ

;; 688..767-Spacing-Modifier-Letters

::ii768::̀   ;; 768..879 ̀..ͯ-Combining-Diacritical-Marks
::ii879::ͯ

::ii880::Ͱ   ;; 880..1023 Ͱ..Ͽ-Greek-and-Coptic
::ii1000::Ϩ
::ii1023::Ͽ

::ii1024::Ѐ   ;; 1024..1279 Ѐ..ӿ-Cyrillic
::ii1280::Ԁ   ;; 1280..1327 Ԁ..ԯ-Cyrillic-Supplement
::ii1328::԰   ;; 1328..1423 ԰..֏-Armenian
::ii1424::֐   ;; 1424..1535 ֐..׿-Hebrew
::ii1536::؀   ;; 1536..1791 ؀..ۿ-Arabic
::ii1792::܀   ;; 1792..1871 ܀..ݏ-Syriac
::ii1872::ݐ   ;; 1872..1919 ݐ..ݿ-Arabic-Supplement
::ii1920::ހ   ;; 1920..1983 ހ..޿-Thaana
::ii1984::߀   ;; 1984..2047 ߀..߿-NKo

::ii2000::ߐ ; NKO-LETTER-O,
::ii2048::ࠀ   ;; 2048..2111 ࠀ..࠿-Samaritan
::ii2112::ࡀ   ;; 2112..2143 ࡀ..࡟-Mandaic
::ii2144::ࡠ   ;; 2144..2159 ࡠ..࡯-Syriac-Supplement
::ii2208::ࢠ   ;; 2208..2303 ࢠ..ࣿ-Arabic-Extended-A
::ii2304::ऀ   ;; 2304..2431 ऀ..ॿ-Devanagari
::ii2432::ঀ   ;; 2432..2559 ঀ..৿-Bengali
::ii2560::਀   ;; 2560..2687 ਀..੿-Gurmukhi
::ii2688::઀   ;; 2688..2815 ઀..૿-Gujarati
::ii2816::଀   ;; 2816..2943 ଀..୿-Oriya
::ii2944::஀   ;; 2944..3071 ஀..௿-Tamil

::ii3000::ஸ
::ii3072::ఀ   ;; 3072..3199 ఀ..౿-Telugu
::ii3200::ಀ   ;; 3200..3327 ಀ..೿-Kannada
::ii3328::ഀ   ;; 3328..3455 ഀ..ൿ-Malayalam
::ii3456::඀   ;; 3456..3583 ඀..෿-Sinhala
::ii3584::฀   ;; 3584..3711 ฀..๿-Thai
::ii3712::຀   ;; 3712..3839 ຀..໿-Lao
::ii3840::ༀ   ;; 3840..4095 ༀ..࿿-Tibetan

::ii4000::ྠ
::ii4096::က   ;; 4096..4255 က..႟-Myanmar
::ii4256::Ⴀ   ;; 4256..4351 Ⴀ..ჿ-Georgian
::ii4352::ᄀ   ;; 4352..4607 ᄀ..ᇿ-Hangul-Jamo
::ii4608::ሀ   ;; 4608..4991 ሀ..፿-Ethiopic
::ii4992::ᎀ   ;; 4992..5023 ᎀ..᎟-Ethiopic-Supplement

::ii5000::ᎈ
::ii5024::Ꭰ   ;; 5024..5119 Ꭰ..᏿-Cherokee
::ii5120::᐀   ;; 5120..5759 ᐀..ᙿ-Unified-Canadian-Aboriginal-Syllabics
::ii5760::    ;; 5760..5791  ..᚟-Ogham
::ii5792::ᚠ   ;; 5792..5887 ᚠ..᛿-Runic
::ii5888::ᜀ   ;; 5888..5919 ᜀ..ᜟ-Tagalog
::ii5920::ᜠ   ;; 5920..5951 ᜠ..᜿-Hanunoo
::ii5952::ᝀ   ;; 5952..5983 ᝀ..᝟-Buhid
::ii5984::ᝠ   ;; 5984..6015 ᝠ..᝿-Tagbanwa

::ii6000::ᝰ ; TAGBANWA-LETTER-SA
;;;;;;;;;;; KHMER ;;;;;;;;;;;;;;;;;;;
::ii6016::ក   ;; 6016..6143 ក..៿-Khmer
::ii6017::ខ
::ii6018::គ
::ii6019::ឃ
::ii6020::ង
::ii6021::ច
::ii6022::ឆ
::ii6023::ជ
::ii6024::ឈ
::ii6025::ញ
::ii6026::ដ
::ii6027::ឋ
::ii6028::ឌ
::ii6029::ឍ
::ii6030::ណ
::ii6031::ត
::ii6032::ថ
::ii6033::ទ
::ii6034::ធ
::ii6035::ន
::ii6036::ប
::ii6037::ផ
::ii6038::ព
::ii6039::ភ
::ii6040::ម
::ii6041::យ
::ii6042::រ
::ii6043::ល
::ii6044::វ
::ii6045::ឝ
::ii6046::ឞ
::ii6047::ស
::ii6048::ហ
::ii6049::ឡ
::ii6050::អ
::ii6053::ឥ   ;; QI
::ii6055::ឧ   ;; QU
::ii6058::ឪ   ;; QUUV
::ii6059::ឫ   ;; RY
::ii6060::ឬ   ;; RYY
::ii6063::ឯ   ;; QE
::ii6064::ឰ   ;; QAI
::ii6065::ឱ   ;; QOO
::ii6067::ឳ   ;; QAU
::ii6070::ា   ;; [aː-iə]-vowel
::ii6071::ិ   ;; [e-ə]-vowel
::ii6072::ី   ;; [əj-ɨj]-vowel
::ii6075::ុ   ;; [o-u]-vowel
::ii6076::ូ   ;; [ou-uu]-vowel
::ii6077::ួ   ;; vowel
::ii6078::ើ  ;; [aə-əə]-vowel
::ii6079::ឿ  ;; [ɨə]-vowel
::ii6080::ៀ  ;; [iə]-vowel
::ii6081::េ   ;; [ei-ii]-vowel
::ii6082::ែ   ;; [ae-ɛɛ]-vowel
::ii6083::ៃ   ;; [aj-əj]-vowel
::ii6084::ោ  ;; [ao-ɔɔ]-vowel
::ii6085::ៅ  ;; [aw-ɨw]-vowel
::ii6086:: ំ   ;;  (Nikâhît): Usually Shift+M
::ii6088:: ៈ  ;;  (Visarga): Usually Shift+:
::ii6089:: ៉   ;;  (Mŭsĕkâtôndâ): Usually ]
::ii6090:: ៊   ;;  (Triisâp): Usually Shift+]
::ii6091:: ់   ;;  (Bântâk): Usually Shift+[

::ii6144::᠀   ;; 6144..6319 ᠀..᢯-Mongolian
::ii6320::ᢰ   ;; 6320..6399 ᢰ..᣿-Unified-Canadian-Aboriginal-Syllabics-Extended
::ii6400::ᤀ   ;; 6400..6479 ᤀ..᥏-Limbu
::ii6480::ᥐ   ;; 6480..6527 ᥐ..᥿-Tai-Le
::ii6528::ᦀ   ;; 6528..6623 ᦀ..᧟-New-Tai-Lue
::ii6624::᧠   ;; 6624..6655 ᧠..᧿-Khmer-Symbols
::ii6656::ᨀ   ;; 6656..6687 ᨀ..᨟-Buginese
::ii6688::ᨠ   ;; 6688..6831 ᨠ..᪯-Tai-Tham
::ii6832::᪰   ;; 6832..6911 ᪰..᫿-Combining-Diacritical-Marks-Extended
::ii6912::ᬀ   ;; 6912..7039 ᬀ..᭿-Balinese

::ii7000::᭘
::ii7040::ᮀ   ;; 7040..7103 ᮀ..ᮿ-Sundanese
::ii7104::ᯀ   ;; 7104..7167 ᯀ..᯿-Batak
::ii7168::ᰀ   ;; 7168..7247 ᰀ..ᱏ-Lepcha
::ii7248::᱐   ;; 7248..7295 ᱐..᱿-Ol-Chiki
::ii7296::ᲀ   ;; 7296..7311 ᲀ..᲏-Cyrillic-Extended-C
::ii7312::Ა   ;; 7312..7359 Ა..Ჿ-Georgian-Extended
::ii7360::᳀   ;; 7360..7375 ᳀..᳏-Sundanese-Supplement
::ii7376::᳐   ;; 7376..7423 ᳐..᳿-Vedic-Extensions
::ii7424::ᴀ   ;; 7424..7551 ᴀ..ᵿ-Phonetic-Extensions
::ii7552::ᶀ   ;; 7552..7615 ᶀ..ᶿ-Phonetic-Extensions-Supplement
::ii7616::᷀   ;; 7616..7679 ᷀..᷿-Combining-Diacritical-Marks-Supplement
::ii7680::Ḁ   ;; 7680..7935 Ḁ..ỿ-Latin-Extended-Additional

::ii7936::ἀ   ;; 7936..8191 ἀ..῿-Greek-Extended
::ii7937::ἁ
::ii7938::ἂ
::ii7939::ἃ
::ii7940::ἄ
::ii7941::ἅ
::ii7942::ἆ
::ii7943::ἇ
::ii7944::Ἀ
::ii7945::Ἁ
::ii7946::Ἂ
::ii7947::Ἃ
::ii7948::Ἄ
::ii7949::Ἅ
::ii7950::Ἆ
::ii7951::Ἇ
::ii7952::ἐ
::ii7953::ἑ
::ii7954::ἒ
::ii7955::ἓ
::ii7956::ἔ
::ii7957::ἕ
::ii7960::Ἐ
::ii7961::Ἑ
::ii7962::Ἒ
::ii7963::Ἓ
::ii7964::Ἔ
::ii7965::Ἕ
::ii7968::ἠ
::ii7969::ἡ
::ii7970::ἢ
::ii7971::ἣ
::ii7972::ἤ
::ii7973::ἥ
::ii7974::ἦ
::ii7975::ἧ
::ii7976::Ἠ
::ii7977::Ἡ
::ii7978::Ἢ
::ii7979::Ἣ
::ii7980::Ἤ
::ii7981::Ἥ
::ii7982::Ἦ
::ii7983::Ἧ
::ii7984::ἰ
::ii7985::ἱ
::ii7986::ἲ
::ii7987::ἳ
::ii7988::ἴ
::ii7989::ἵ
::ii7990::ἶ
::ii7991::ἷ
::ii7992::Ἰ
::ii7993::Ἱ
::ii7994::Ἲ
::ii7995::Ἳ
::ii7996::Ἴ
::ii7997::Ἵ
::ii7998::Ἶ
::ii7999::Ἷ
::ii8000::ὀ
::ii8001::ὁ
::ii8002::ὂ
::ii8003::ὃ
::ii8004::ὄ
::ii8005::ὅ
::ii8008::Ὀ
::ii8009::Ὁ
::ii8010::Ὂ
::ii8011::Ὃ
::ii8012::Ὄ
::ii8013::Ὅ
::ii8016::ὐ
::ii8017::ὑ
::ii8018::ὒ
::ii8019::ὓ
::ii8020::ὔ
::ii8021::ὕ
::ii8022::ὖ
::ii8023::ὗ
::ii8025::Ὑ
::ii8027::Ὓ
::ii8029::Ὕ
::ii8031::Ὗ
::ii8032::ὠ
::ii8033::ὡ
::ii8034::ὢ
::ii8035::ὣ
::ii8036::ὤ
::ii8037::ὥ
::ii8038::ὦ
::ii8039::ὧ
::ii8040::Ὠ
::ii8041::Ὡ
::ii8042::Ὢ
::ii8043::Ὣ
::ii8044::Ὤ
::ii8045::Ὥ
::ii8046::Ὦ
::ii8047::Ὧ
::ii8048::ὰ
::ii8049::ά
::ii8050::ὲ
::ii8051::έ
::ii8052::ὴ
::ii8053::ή
::ii8054::ὶ
::ii8055::ί
::ii8056::ὸ
::ii8057::ό
::ii8058::ὺ
::ii8059::ύ
::ii8060::ὼ
::ii8061::ώ
::ii8064::ᾀ
::ii8065::ᾁ
::ii8066::ᾂ
::ii8067::ᾃ
::ii8068::ᾄ
::ii8069::ᾅ
::ii8070::ᾆ
::ii8071::ᾇ
::ii8072::ᾈ
::ii8073::ᾉ
::ii8074::ᾊ
::ii8075::ᾋ
::ii8076::ᾌ
::ii8077::ᾍ
::ii8078::ᾎ
::ii8079::ᾏ
::ii8080::ᾐ
::ii8081::ᾑ
::ii8082::ᾒ
::ii8083::ᾓ
::ii8084::ᾔ
::ii8085::ᾕ
::ii8086::ᾖ
::ii8087::ᾗ
::ii8088::ᾘ
::ii8089::ᾙ
::ii8090::ᾚ
::ii8091::ᾛ
::ii8092::ᾜ
::ii8093::ᾝ
::ii8094::ᾞ
::ii8095::ᾟ
::ii8096::ᾠ
::ii8097::ᾡ
::ii8098::ᾢ
::ii8099::ᾣ
::ii8100::ᾤ
::ii8101::ᾥ
::ii8102::ᾦ
::ii8103::ᾧ
::ii8104::ᾨ
::ii8105::ᾩ
::ii8106::ᾪ
::ii8107::ᾫ
::ii8108::ᾬ
::ii8109::ᾭ
::ii8110::ᾮ
::ii8111::ᾯ
::ii8112::ᾰ
::ii8113::ᾱ
::ii8114::ᾲ
::ii8115::ᾳ
::ii8116::ᾴ
::ii8118::ᾶ
::ii8119::ᾷ
::ii8120::Ᾰ
::ii8121::Ᾱ
::ii8122::Ὰ
::ii8123::Ά
::ii8124::ᾼ
::ii8130::ῂ
::ii8131::ῃ
::ii8132::ῄ
::ii8134::ῆ
::ii8135::ῇ
::ii8136::Ὲ
::ii8137::Έ
::ii8138::Ὴ
::ii8139::Ή
::ii8140::ῌ
::ii8144::ῐ
::ii8145::ῑ
::ii8146:::ῒ
::ii8147:::ΐ
::ii8150::ῖ
::ii8151:::ῗ
::ii8152::Ῐ
::ii8153::Ῑ
::ii8154::Ὶ
::ii8155::Ί
::ii8160::ῠ
::ii8161::ῡ
::ii8162:::ῢ
::ii8163:::ΰ
::ii8164::ῤ
::ii8165::ῥ
::ii8166::ῦ
::ii8167:::ῧ
::ii8168::Ῠ
::ii8169::Ῡ
::ii8170::Ὺ
::ii8171::Ύ
::ii8172::Ῥ
::ii8178::ῲ
::ii8179::ῳ
::ii8180::ῴ
::ii8182::ῶ
::ii8183::ῷ
::ii8184::Ὸ
::ii8185::Ό
::ii8186::Ὼ
::ii8187::Ώ
::ii8188::ῼ

::ii8192::    ;; 8192..8303  ..⁯-General-Punctuation
::ii8304::⁰   ;; 8304..8351 ⁰..₟-Superscripts-and-Subscripts
::ii8352::₠   ;; 8352..8399 ₠..⃏-Currency-Symbols
::ii8364::€
::ii8400::⃐   ;; 8400..8447 ⃐..⃿-Combining-Diacritical-Marks-for-Symbols
::ii8448::℀   ;; 8448..8527 ℀..⅏-Letterlike-Symbols
::ii8528::⅐   ;; 8528..8591 ⅐..↏-Number-Forms
::ii8592::←   ;; 8592..8703 ←..⇿-Arrows
::ii8704::∀   ;; 8704..8959 ∀..⋿-Mathematical-Operators
::ii8960::⌀   ;; 8960..9215 ⌀..⏿-Miscellaneous-Technical

::ii9000::⌨
::ii9216::␀   ;; 9216..9279 ␀..␿-Control-Pictures
::ii9280::⑀   ;; 9280..9311 ⑀..⑟-Optical-Character-Recognition
::ii9312::①   ;; 9312..9471 ①..⓿-Enclosed-Alphanumerics
::ii9472::─   ;; 9472..9599 ─..╿-Box-Drawing
::ii9600::▀   ;; 9600..9631 ▀..▟-Block-Elements
::ii9632::■   ;; 9632..9727 ■..◿-Geometric-Shapes
::ii9728::☀   ;; 9728..9983 ☀..⛿-Miscellaneous-Symbols
::ii9984::✀   ;; 9984..10175 ✀..➿-Dingbats

::ii10000::✐
::ii11000::⫸
::ii10176::⟀   ;; 10176..10223 ⟀..⟯-Miscellaneous-Mathematical-Symbols-A
::ii10224::⟰   ;; 10224..10239 ⟰..⟿-Supplemental-Arrows-A
::ii10240::⠀   ;; 10240..10495 ⠀..⣿-Braille-Patterns
::ii10496::⤀   ;; 10496..10623 ⤀..⥿-Supplemental-Arrows-B
::ii10624::⦀   ;; 10624..10751 ⦀..⧿-Miscellaneous-Mathematical-Symbols-B
::ii10752::⨀   ;; 10752..11007 ⨀..⫿-Supplemental-Mathematical-Operators
::ii11008::⬀   ;; 11008..11263 ⬀..⯿-Miscellaneous-Symbols-and-Arrows
::ii11264::Ⰰ   ;; 11264..11359 Ⰰ..ⱟ-Glagolitic
::ii11360::Ⱡ   ;; 11360..11391 Ⱡ..Ɀ-Latin-Extended-C
::ii11392::Ⲁ   ;; 11392..11519 Ⲁ..⳿-Coptic
::ii11520::ⴀ   ;; 11520..11567 ⴀ..⴯-Georgian-Supplement
::ii11568::ⴰ   ;; 11568..11647 ⴰ..⵿-Tifinagh
::ii11648::ⶀ   ;; 11648..11743 ⶀ..⷟-Ethiopic-Extended
::ii11744::ⷠ   ;; 11744..11775 ⷠ..ⷿ-Cyrillic-Extended-A
::ii11776::⸀   ;; 11776..11903 ⸀..⹿-Supplemental-Punctuation
::ii11904::⺀   ;; 11904..12031 ⺀..⻿-CJK-Radicals-Supplement

::ii12000::⻠
::ii12290::。
::ii12032::⼀   ;; 12032..12255 ⼀..⿟-Kangxi-Radicals
::ii12272::⿰   ;; 12272..12287 ⿰..⿿-Ideographic-Description-Characters
::ii12288::　   ;; 12288..12351 　..〿-CJK-Symbols-and-Punctuation
::ii12352::぀   ;; 12352..12447 ぀..ゟ-Hiragana
::ii12448::゠   ;; 12448..12543 ゠..ヿ-Katakana
::ii12544::㄀   ;; 12544..12591 ㄀..ㄯ-Bopomofo
::ii12592::㄰   ;; 12592..12687 ㄰..㆏-Hangul-Compatibility-Jamo
::ii12688::㆐   ;; 12688..12703 ㆐..㆟-Kanbun
::ii12704::ㆠ   ;; 12704..12735 ㆠ..ㆿ-Bopomofo-Extended
::ii12736::㇀   ;; 12736..12783 ㇀..㇯-CJK-Strokes
::ii12784::ㇰ   ;; 12784..12799 ㇰ..ㇿ-Katakana-Phonetic-Extensions
::ii12800::㈀   ;; 12800..13055 ㈀..㋿-Enclosed-CJK-Letters-and-Months
::ii13056::㌀   ;; 13056..13311 ㌀..㏿-CJK-Compatibility
::ii13312::㐀   ;; 13312..19903 㐀..䶿-CJK-Unified-Ideographs-Extension-A
::ii19904::䷀   ;; 19904..19967 ䷀..䷿-Yijing-Hexagram-Symbols
::ii19968::一   ;; 19968..40959 一..鿿-CJK-Unified-Ideographs
::ii40960::ꀀ   ;; 40960..42127 ꀀ..꒏-Yi-Syllables
::ii42128::꒐   ;; 42128..42191 ꒐..꓏-Yi-Radicals
::ii42192::ꓐ   ;; 42192..42239 ꓐ..꓿-Lisu
::ii42240::ꔀ   ;; 42240..42559 ꔀ..꘿-Vai
::ii42560::Ꙁ   ;; 42560..42655 Ꙁ..ꚟ-Cyrillic-Extended-B
::ii42656::ꚠ   ;; 42656..42751 ꚠ..꛿-Bamum
::ii42752::꜀   ;; 42752..42783 ꜀..ꜟ-Modifier-Tone-Letters
::ii42784::꜠   ;; 42784..43007 ꜠..ꟿ-Latin-Extended-D
::ii43008::ꠀ   ;; 43008..43055 ꠀ..꠯-Syloti-Nagri
::ii43056::꠰   ;; 43056..43071 ꠰..꠿-Common-Indic-Number-Forms
::ii43072::ꡀ   ;; 43072..43135 ꡀ..꡿-Phags-pa
::ii43136::ꢀ   ;; 43136..43231 ꢀ..꣟-Saurashtra
::ii43232::꣠   ;; 43232..43263 ꣠..ꣿ-Devanagari-Extended
::ii43264::꤀   ;; 43264..43311 ꤀..꤯-Kayah-Li
::ii43312::ꤰ   ;; 43312..43359 ꤰ..꥟-Rejang
::ii43360::ꥠ   ;; 43360..43391 ꥠ..꥿-Hangul-Jamo-Extended-A
::ii43392::ꦀ   ;; 43392..43487 ꦀ..꧟-Javanese
::ii43488::ꧠ   ;; 43488..43519 ꧠ..꧿-Myanmar-Extended-B
::ii43520::ꨀ   ;; 43520..43615 ꨀ..꩟-Cham
::ii43616::ꩠ   ;; 43616..43647 ꩠ..ꩿ-Myanmar-Extended-A
::ii43648::ꪀ   ;; 43648..43743 ꪀ..꫟-Tai-Viet
::ii43744::ꫠ   ;; 43744..43775 ꫠ..꫿-Meetei-Mayek-Extensions
::ii43776::꬀   ;; 43776..43823 ꬀..꬯-Ethiopic-Extended-A
::ii43824::ꬰ   ;; 43824..43887 ꬰ..꭯-Latin-Extended-E
::ii43888::ꭰ   ;; 43888..43967 ꭰ..ꮿ-Cherokee-Supplement
::ii43968::ꯀ   ;; 43968..44031 ꯀ..꯿-Meetei-Mayek
::ii44032::가   ;; 44032..55215 가..힯-Hangul-Syllables
::ii55216::ힰ   ;; 55216..55295 ힰ..퟿-Hangul-Jamo-Extended-B
::ii63744::豈   ;; 63744..64255 豈..﫿-CJK-Compatibility-Ideographs
::ii64256::ﬀ   ;; 64256..64335 ﬀ..ﭏ-Alphabetic-Presentation-Forms
::ii64336::ﭐ   ;; 64336..65023 ﭐ..﷿-Arabic-Presentation-Forms-A
::ii65024::︀   ;; 65024..65039 ︀..️-Variation-Selectors
::ii65040::︐   ;; 65040..65055 ︐..︟-Vertical-Forms
::ii65056::︠   ;; 65056..65071 ︠..︯-Combining-Half-Marks
::ii65072::︰   ;; 65072..65103 ︰..﹏-CJK-Compatibility-Forms
::ii65104::﹐   ;; 65104..65135 ﹐..﹯-Small-Form-Variants
::ii65136::ﹰ   ;; 65136..65279 ﹰ..﻿-Arabic-Presentation-Forms-B
::ii65280::＀   ;; 65280..65519 ＀..￯-Halfwidth-and-Fullwidth-Forms
::ii65520::￰   ;; 65520..65535 ￰..￿-Specials
::ii65536::𐀀   ;; 65536..65663 𐀀..𐁿-Linear-B-Syllabary
::ii65664::𐂀   ;; 65664..65791 𐂀..𐃿-Linear-B-Ideograms
::ii65792::𐄀   ;; 65792..65855 𐄀..𐄿-Aegean-Numbers
::ii65856::𐅀   ;; 65856..65935 𐅀..𐆏-Ancient-Greek-Numbers
::ii65936::𐆐   ;; 65936..65999 𐆐..𐇏-Ancient-Symbols
::ii66000::𐇐   ;; 66000..66047 𐇐..𐇿-Phaistos-Disc
::ii66176::𐊀   ;; 66176..66207 𐊀..𐊟-Lycian
::ii66208::𐊠   ;; 66208..66271 𐊠..𐋟-Carian
::ii66272::𐋠   ;; 66272..66303 𐋠..𐋿-Coptic-Epact-Numbers
::ii66304::𐌀   ;; 66304..66351 𐌀..𐌯-Old-Italic
::ii66352::𐌰   ;; 66352..66383 𐌰..𐍏-Gothic
::ii66384::𐍐   ;; 66384..66431 𐍐..𐍿-Old-Permic
::ii66432::𐎀   ;; 66432..66463 𐎀..𐎟-Ugaritic
::ii66464::𐎠   ;; 66464..66527 𐎠..𐏟-Old-Persian
::ii66560::𐐀   ;; 66560..66639 𐐀..𐑏-Deseret
::ii66640::𐑐   ;; 66640..66687 𐑐..𐑿-Shavian
::ii66688::𐒀   ;; 66688..66735 𐒀..𐒯-Osmanya
::ii66736::𐒰   ;; 66736..66815 𐒰..𐓿-Osage
::ii66816::𐔀   ;; 66816..66863 𐔀..𐔯-Elbasan
::ii66864::𐔰   ;; 66864..66927 𐔰..𐕯-Caucasian-Albanian
::ii67072::𐘀   ;; 67072..67455 𐘀..𐝿-Linear-A
::ii67584::𐠀   ;; 67584..67647 𐠀..𐠿-Cypriot-Syllabary
::ii67648::𐡀   ;; 67648..67679 𐡀..𐡟-Imperial-Aramaic
::ii67680::𐡠   ;; 67680..67711 𐡠..𐡿-Palmyrene
::ii67712::𐢀   ;; 67712..67759 𐢀..𐢯-Nabataean
::ii67808::𐣠   ;; 67808..67839 𐣠..𐣿-Hatran
::ii67840::𐤀   ;; 67840..67871 𐤀..𐤟-Phoenician
::ii67872::𐤠   ;; 67872..67903 𐤠..𐤿-Lydian
::ii67968::𐦀   ;; 67968..67999 𐦀..𐦟-Meroitic-Hieroglyphs
::ii68000::𐦠   ;; 68000..68095 𐦠..𐧿-Meroitic-Cursive
::ii68096::𐨀   ;; 68096..68191 𐨀..𐩟-Kharoshthi
::ii68192::𐩠   ;; 68192..68223 𐩠..𐩿-Old-South-Arabian
::ii68224::𐪀   ;; 68224..68255 𐪀..𐪟-Old-North-Arabian
::ii68288::𐫀   ;; 68288..68351 𐫀..𐫿-Manichaean
::ii68352::𐬀   ;; 68352..68415 𐬀..𐬿-Avestan
::ii68416::𐭀   ;; 68416..68447 𐭀..𐭟-Inscriptional-Parthian
::ii68448::𐭠   ;; 68448..68479 𐭠..𐭿-Inscriptional-Pahlavi
::ii68480::𐮀   ;; 68480..68527 𐮀..𐮯-Psalter-Pahlavi
::ii68608::𐰀   ;; 68608..68687 𐰀..𐱏-Old-Turkic
::ii68736::𐲀   ;; 68736..68863 𐲀..𐳿-Old-Hungarian
::ii68864::𐴀   ;; 68864..68927 𐴀..𐴿-Hanifi-Rohingya
::ii69216::𐹠   ;; 69216..69247 𐹠..𐹿-Rumi-Numeral-Symbols
::ii69376::𐼀   ;; 69376..69423 𐼀..𐼯-Old-Sogdian
::ii69424::𐼰   ;; 69424..69487 𐼰..𐽯-Sogdian
::ii69632::𑀀   ;; 69632..69759 𑀀..𑁿-Brahmi
::ii69760::𑂀   ;; 69760..69839 𑂀..𑃏-Kaithi
::ii69840::𑃐   ;; 69840..69887 𑃐..𑃿-Sora-Sompeng
::ii69888::𑄀   ;; 69888..69967 𑄀..𑅏-Chakma
::ii69968::𑅐   ;; 69968..70015 𑅐..𑅿-Mahajani
::ii70016::𑆀   ;; 70016..70111 𑆀..𑇟-Sharada
::ii70112::𑇠   ;; 70112..70143 𑇠..𑇿-Sinhala-Archaic-Numbers
::ii70144::𑈀   ;; 70144..70223 𑈀..𑉏-Khojki
::ii70272::𑊀   ;; 70272..70319 𑊀..𑊯-Multani
::ii70320::𑊰   ;; 70320..70399 𑊰..𑋿-Khudawadi
::ii70400::𑌀   ;; 70400..70527 𑌀..𑍿-Grantha
::ii70656::𑐀   ;; 70656..70783 𑐀..𑑿-Newa
::ii70784::𑒀   ;; 70784..70879 𑒀..𑓟-Tirhuta
::ii71040::𑖀   ;; 71040..71167 𑖀..𑗿-Siddham
::ii71168::𑘀   ;; 71168..71263 𑘀..𑙟-Modi
::ii71264::𑙠   ;; 71264..71295 𑙠..𑙿-Mongolian-Supplement
::ii71296::𑚀   ;; 71296..71375 𑚀..𑛏-Takri
::ii71424::𑜀   ;; 71424..71487 𑜀..𑜿-Ahom
::ii71680::𑠀   ;; 71680..71759 𑠀..𑡏-Dogra
::ii71840::𑢠   ;; 71840..71935 𑢠..𑣿-Warang-Citi
::ii72192::𑨀   ;; 72192..72271 𑨀..𑩏-Zanabazar-Square
::ii72272::𑩐   ;; 72272..72367 𑩐..𑪯-Soyombo
::ii72384::𑫀   ;; 72384..72447 𑫀..𑫿-Pau-Cin-Hau
::ii72704::𑰀   ;; 72704..72815 𑰀..𑱯-Bhaiksuki
::ii72816::𑱰   ;; 72816..72895 𑱰..𑲿-Marchen
::ii72960::𑴀   ;; 72960..73055 𑴀..𑵟-Masaram-Gondi
::ii73056::𑵠   ;; 73056..73135 𑵠..𑶯-Gunjala-Gondi
::ii73440::𑻠   ;; 73440..73471 𑻠..𑻿-Makasar
::ii73728::𒀀   ;; 73728..74751 𒀀..𒏿-Cuneiform
::ii74752::𒐀   ;; 74752..74879 𒐀..𒑿-Cuneiform-Numbers-and-Punctuation
::ii74880::𒒀   ;; 74880..75087 𒒀..𒕏-Early-Dynastic-Cuneiform
::ii77824::𓀀   ;; 77824..78895 𓀀..𓐯-Egyptian-Hieroglyphs
::ii82944::𔐀   ;; 82944..83583 𔐀..𔙿-Anatolian-Hieroglyphs
::ii92160::𖠀   ;; 92160..92735 𖠀..𖨿-Bamum-Supplement
::ii92736::𖩀   ;; 92736..92783 𖩀..𖩯-Mro
::ii92880::𖫐   ;; 92880..92927 𖫐..𖫿-Bassa-Vah
::ii92928::𖬀   ;; 92928..93071 𖬀..𖮏-Pahawh-Hmong
::ii93760::𖹀   ;; 93760..93855 𖹀..𖺟-Medefaidrin
::ii93952::𖼀   ;; 93952..94111 𖼀..𖾟-Miao
::ii94176::𖿠   ;; 94176..94207 𖿠..𖿿-Ideographic-Symbols-and-Punctuation
::ii94208::𗀀   ;; 94208..100351 𗀀..𘟿-Tangut

::ii100000::𘚠
::ii110000::𚶰
;; 100352..101119|U+18800..U+18AFF|𘠀..𘫿-Tangut-Components
;; 110592..110847|U+1B000..U+1B0FF|𛀀..𛃿-Kana-Supplement
;; 110848..110895|U+1B100..U+1B12F|𛄀..𛄯-Kana-Extended-A
;; 110960..111359|U+1B170..U+1B2FF|𛅰..𛋿-Nushu
;; 113664..113823|U+1BC00..U+1BC9F|𛰀..𛲟-Duployan
;; 113824..113839|U+1BCA0..U+1BCAF|𛲠..𛲯-Shorthand-Format-Controls
;; 118784..119039|U+1D000..U+1D0FF|𝀀..𝃿-Byzantine-Musical-Symbols
;; 119040..119295|U+1D100..U+1D1FF|𝄀..𝇿-Musical-Symbols
;; 119296..119375|U+1D200..U+1D24F|𝈀..𝉏-Ancient-Greek-Musical-Notation
;; 119520..119551|U+1D2E0..U+1D2FF|𝋠..𝋿-Mayan-Numerals
;; 119552..119647|U+1D300..U+1D35F|𝌀..𝍟-Tai-Xuan-Jing-Symbols
;; 119648..119679|U+1D360..U+1D37F|𝍠..𝍿-Counting-Rod-Numerals
;; 119808..120831|U+1D400..U+1D7FF|𝐀..𝟿-Mathematical-Alphanumeric-Symbols

::ii120000::𝓀
::ii120143::𝕏
::ii120169::𝕩
;; 120832..121519|U+1D800..U+1DAAF|𝠀..𝪯-Sutton-SignWriting
;; 122880..122927|U+1E000..U+1E02F|𞀀..𞀯-Glagolitic-Supplement
;; 124928..125151|U+1E800..U+1E8DF|𞠀..𞣟-Mende-Kikakui
;; 125184..125279|U+1E900..U+1E95F|𞤀..𞥟-Adlam
;; 126064..126143|U+1EC70..U+1ECBF|𞱰..𞲿-Indic-Siyaq-Numbers
;; 126464..126719|U+1EE00..U+1EEFF|𞸀..𞻿-Arabic-Mathematical-Alphabetic-Symbols
;; 126976..127023|U+1F000..U+1F02F|🀀..🀯-Mahjong-Tiles
;; 127024..127135|U+1F030..U+1F09F|🀰..🂟-Domino-Tiles
;; 127136..127231|U+1F0A0..U+1F0FF|🂠..🃿-Playing-Cards
;; 127232..127487|U+1F100..U+1F1FF|🄀..🇿-Enclosed-Alphanumeric-Supplement
;; 127488..127743|U+1F200..U+1F2FF|🈀..🋿-Enclosed-Ideographic-Supplement
;; 127744..128511|U+1F300..U+1F5FF|🌀..🗿-Miscellaneous-Symbols-and-Pictographs
;; 128512..128591|U+1F600..U+1F64F|😀..🙏-Emoticons
;; 128592..128639|U+1F650..U+1F67F|🙐..🙿-Ornamental-Dingbats
;; 128640..128767|U+1F680..U+1F6FF|🚀..🛿-Transport-and-Map-Symbols
;; 128768..128895|U+1F700..U+1F77F|🜀..🝿-Alchemical-Symbols
;; 128896..129023|U+1F780..U+1F7FF|🞀..🟿-Geometric-Shapes-Extended
;; 129024..129279|U+1F800..U+1F8FF|🠀..🣿-Supplemental-Arrows-C
;; 129280..129535|U+1F900..U+1F9FF|🤀..🧿-Supplemental-Symbols-and-Pictographs
;; 129536..129647|U+1FA00..U+1FA6F|🨀..🩯-Chess-Symbols
;; 131072..173791|U+20000..U+2A6DF|𠀀..𪛟-CJK-Unified-Ideographs-Extension-B
;; 173824..177983|U+2A700..U+2B73F|𪜀..𫜿-CJK-Unified-Ideographs-Extension-C
;; 177984..178207|U+2B740..U+2B81F|𫝀..𫠟-CJK-Unified-Ideographs-Extension-D
;; 178208..183983|U+2B820..U+2CEAF|𫠠..𬺯-CJK-Unified-Ideographs-Extension-E
;; 183984..191471|U+2CEB0..U+2EBEF|𬺰..𮯯-CJK-Unified-Ideographs-Extension-F
;; 194560..195103|U+2F800..U+2FA1F|丽..𯨟-CJK-Compatibility-Ideographs-Supplement
