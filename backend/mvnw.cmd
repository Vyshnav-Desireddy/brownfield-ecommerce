@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup batch script, version 3.3.2
@REM ----------------------------------------------------------------------------

@echo off

set ERROR_CODE=0

if "%OS%"=="Windows_NT" setlocal

set MAVEN_PROJECTBASEDIR=%~dp0
set WRAPPER_JAR="%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
set WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

if "%JAVA_HOME%"=="" (
  echo Error: JAVA_HOME not found in your environment. >&2
  exit /b 1
)

set JAVA_EXE="%JAVA_HOME%\bin\java.exe"

%JAVA_EXE% %JAVA_OPTS% %MAVEN_OPTS% -classpath %WRAPPER_JAR% "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" %WRAPPER_LAUNCHER% %*
if ERRORLEVEL 1 goto error
goto end

:error
set ERROR_CODE=1

:end
if "%OS%"=="Windows_NT" endlocal
exit /b %ERROR_CODE%
