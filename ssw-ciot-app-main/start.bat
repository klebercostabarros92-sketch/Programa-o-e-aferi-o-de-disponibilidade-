@echo off
setlocal
title SSW CIOT App
echo.
echo  =========================================
echo   SSW CIOT Emission Service - Iniciando...
echo  =========================================
echo.
cd /d "%~dp0"

if exist "ssw-sessions" (
  echo  Limpando pasta ssw-sessions...
  rmdir /s /q "ssw-sessions"
  echo  Pasta ssw-sessions removida.
  echo.
)

call npm start
set EXITCODE=%ERRORLEVEL%

echo.
echo  =========================================
if %EXITCODE% NEQ 0 (
  echo   Aplicacao encerrada com ERRO ^(codigo: %EXITCODE%^)
) else (
  echo   Aplicacao encerrada com sucesso.
)
echo  =========================================
echo.
echo  Pressione qualquer tecla para fechar...
pause >nul
endlocal
