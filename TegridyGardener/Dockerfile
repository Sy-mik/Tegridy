#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY TregidyGardener.WebAPI/TregidyGardener.WebAPI.csproj TregidyGardener.WebAPI/
COPY BusinessLogic/BusinessLogic.csproj BusinessLogic/
COPY Model/Model.csproj Model/
COPY TegridyGardenerDbContext/TegridyGardenerDbContext.csproj TegridyGardenerDbContext/
RUN dotnet restore "TregidyGardener.WebAPI/TregidyGardener.WebAPI.csproj"
COPY . .
WORKDIR "/src/TregidyGardener.WebAPI"
RUN dotnet build "TregidyGardener.WebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TregidyGardener.WebAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TregidyGardener.WebAPI.dll"]
