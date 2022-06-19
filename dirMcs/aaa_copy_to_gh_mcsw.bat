rem /D=date,
rem /Y=does not ask for confirmation
rem /S=subdirectories, /E=subdirectories and empties,
rem /I=does not ask for directory or file

rem site: dWstSgm
xcopy C:\xampp\htdocs\dWstSgm\index.html C:\dirGitHub\McsWorld\site\index.html /D /Y /I

rem dirMcs
xcopy *.last.html C:\dirGitHub\McsWorld\dirMcs /D /S /Y /I
xcopy index.html C:\dirGitHub\McsWorld\dirMcs /D /S /Y /I
xcopy Mcsqnt.* C:\dirGitHub\McsWorld\dirMcs /D /S /Y /I
xcopy namidx.txt C:\dirGitHub\McsWorld\dirMcs /D /Y
xcopy sftp.json C:\dirGitHub\McsWorld\dirMcs /D /Y
xcopy Mcsmgr\*.* C:\dirGitHub\McsWorld\dirMcs\Mcsmgr\ /D /Y
xcopy dirNamidx\*.* C:\dirGitHub\McsWorld\dirMcs\dirNamidx\ /D /S /Y /I
xcopy dirWrdidx\*.json C:\dirGitHub\McsWorld\dirMcs\dirWrdidx\ /D /S /Y /I

