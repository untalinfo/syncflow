using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Syncflow.API.Infrastructure.Data;
using Syncflow.API.Infrastructure.Repositories;
using Syncflow.API.Domain.Interfaces;
using System;
using System.Collections.Generic;

var builder = WebApplication.CreateBuilder(args);

// Configurar SQLite en memoria para máxima simpleza
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=syncflow.db"));

// Inyección de dependencias para Clean Architecture
builder.Services.AddScoped<IRequestRepository, RequestRepository>();

// Habilitar CORS para que React local pueda consultar la API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// Agregar controladores para Clean Architecture Restructure
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowAll");

// Asegurar que la BD exista
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.MapControllers();

app.Run();
