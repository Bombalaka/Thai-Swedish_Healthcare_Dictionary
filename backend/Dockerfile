FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["src/ThaiSwedishDictionary.Api/ThaiSwedishDictionary.Api.csproj", "ThaiSwedishDictionary.Api/"]
COPY ["src/ThaiSwedishDictionary.Application/ThaiSwedishDictionary.Application.csproj", "ThaiSwedishDictionary.Application/"]
COPY ["src/ThaiSwedishDictionary.Domain/ThaiSwedishDictionary.Domain.csproj", "ThaiSwedishDictionary.Domain/"]
COPY ["src/ThaiSwedishDictionary.Infrastructure/ThaiSwedishDictionary.Infrastructure.csproj", "ThaiSwedishDictionary.Infrastructure/"]

RUN dotnet restore "ThaiSwedishDictionary.Api/ThaiSwedishDictionary.Api.csproj"
COPY src/ .
RUN dotnet publish "ThaiSwedishDictionary.Api/ThaiSwedishDictionary.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT:-10000}
EXPOSE 10000
ENTRYPOINT ["dotnet", "ThaiSwedishDictionary.Api.dll"]