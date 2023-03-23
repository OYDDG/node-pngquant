@echo off

set path=%~d0%~p0

:start

"%path%pngquant.exe" --skip-if-larger -f --ext .png %1

shift
if NOT x%1==x goto start

echo Ñ¹ËõÍê³É
pause
exit
