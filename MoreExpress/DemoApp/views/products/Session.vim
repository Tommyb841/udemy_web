let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
argglobal
%argdel
$argadd ~/udemy_web/MoreExpress/DemoApp/views/products/edit.ejs
$argadd ~/udemy_web/MoreExpress/DemoApp/views/products/index.ejs
$argadd ~/udemy_web/MoreExpress/DemoApp/views/products/new.ejs
$argadd ~/udemy_web/MoreExpress/DemoApp/views/products/show.ejs
set stal=2
tabnew
tabnew
tabnew
tabrewind
edit ~/udemy_web/MoreExpress/DemoApp/views/products/edit.ejs
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 30 - ((29 * winheight(0) + 27) / 55)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
30
normal! 04|
tabnext
edit ~/udemy_web/MoreExpress/DemoApp/views/products/index.ejs
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
if bufexists("~/udemy_web/MoreExpress/DemoApp/views/products/index.ejs") | buffer ~/udemy_web/MoreExpress/DemoApp/views/products/index.ejs | else | edit ~/udemy_web/MoreExpress/DemoApp/views/products/index.ejs | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 1 - ((0 * winheight(0) + 27) / 55)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
tabnext
edit ~/udemy_web/MoreExpress/DemoApp/views/products/new.ejs
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
if bufexists("~/udemy_web/MoreExpress/DemoApp/views/products/new.ejs") | buffer ~/udemy_web/MoreExpress/DemoApp/views/products/new.ejs | else | edit ~/udemy_web/MoreExpress/DemoApp/views/products/new.ejs | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 1 - ((0 * winheight(0) + 27) / 55)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
tabnext
edit ~/udemy_web/MoreExpress/DemoApp/views/products/show.ejs
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
if bufexists("~/udemy_web/MoreExpress/DemoApp/views/products/show.ejs") | buffer ~/udemy_web/MoreExpress/DemoApp/views/products/show.ejs | else | edit ~/udemy_web/MoreExpress/DemoApp/views/products/show.ejs | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 2 - ((1 * winheight(0) + 27) / 55)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
2
normal! 0
tabnext 4
set stal=1
badd +0 ~/udemy_web/MoreExpress/DemoApp/views/products/edit.ejs
badd +1 ~/udemy_web/MoreExpress/DemoApp/views/products/index.ejs
badd +1 ~/udemy_web/MoreExpress/DemoApp/views/products/new.ejs
badd +1 ~/udemy_web/MoreExpress/DemoApp/views/products/show.ejs
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOS
set winminheight=1 winminwidth=1
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
