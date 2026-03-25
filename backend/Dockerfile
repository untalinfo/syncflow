FROM mcr.microsoft.com/dotnet/sdk:8.0 AS base
WORKDIR /app
EXPOSE 8080

COPY ["Syncflow.API.csproj", "./"]
RUN dotnet restore "./Syncflow.API.csproj"

COPY . .
# entrypoint using watch for hot reload
ENTRYPOINT ["dotnet", "watch", "run", "--no-launch-profile", "--urls", "http://0.0.0.0:8080"]
