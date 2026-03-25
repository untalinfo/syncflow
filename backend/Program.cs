using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;

var builder = WebApplication.CreateBuilder(args);

// Configurar SQLite en memoria para máxima simpleza en Minimal APIs
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=syncflow.db"));

// Habilitar CORS para que React local pueda consultar la API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

app.UseCors("AllowAll");

// Asegurar que la BD exista
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Endpoint de sincronización (Minimal API)
app.MapPost("/api/sync", async (List<SyncRequest> payload, AppDbContext db) =>
{
    Console.WriteLine($"Recibidas {payload.Count} solicitudes para sincronización.");

    foreach(var req in payload)
    {
        // Guardamos todo en SQLite de forma minimalista
        db.SyncRequests.Add(req);
    }
    
    await db.SaveChangesAsync();

    return Results.Ok(new { message = "Sincronización exitosa", count = payload.Count });
});

app.MapGet("/api/requests", async (AppDbContext db) =>
{
    return await db.SyncRequests.ToListAsync();
});

app.Run();

// -- DOMAIN & INFRASTRUCTURE MODELS MAPPED HERE PARA SIMPLIFICAR --
public record SyncRequest(Guid Id, string Name, string Payload, string Status, string Type, DateTime CreatedAt);

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<SyncRequest> SyncRequests => Set<SyncRequest>();
}
