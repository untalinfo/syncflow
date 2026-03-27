using Microsoft.AspNetCore.Mvc;
using Syncflow.API.Domain.Interfaces;
using Syncflow.API.Domain.Models;
using Syncflow.API.Application.Processors;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Syncflow.API.Api.Controllers;

[ApiController]
[Route("api")]
public class RequestsController : ControllerBase
{
    private readonly IRequestRepository _repository;

    public RequestsController(IRequestRepository repository)
    {
        _repository = repository;
    }

    [HttpPost("sync")]
    public async Task<IActionResult> Sync([FromBody] List<SyncRequest> payload)
    {
        Console.WriteLine($"Recibidas {payload.Count} solicitudes para sincronización.");

        var requestsToSave = new List<SyncRequest>();

        foreach (var req in payload)
        {
            try
            {
                // Aplicamos tu fábrica de estrategias basada en el tipo:
                var processor = RequestProcessorFactory.GetProcessor(req.Type);
                var processedPayload = processor.Process(req.Payload);
                
                // Generamos un nuevo SyncRequest temporal con el payload procesado
                var finalRequest = req with { Payload = processedPayload };
                requestsToSave.Add(finalRequest);
            }
            catch (NotImplementedException)
            {
                // Si el tipo no existe, guardamos el original (fallback opcional)
                requestsToSave.Add(req);
            }
        }

        await _repository.AddRangeAsync(requestsToSave);
        await _repository.SaveChangesAsync();
        
        return Ok(new { message = "Sincronización exitosa", count = payload.Count });
    }

    [HttpGet("requests")]
    public async Task<IActionResult> GetAll()
    {
        var data = await _repository.GetAllAsync();
        return Ok(data);
    }

    [HttpDelete("requests/{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var request = await _repository.GetByIdAsync(id);

        if (request == null)
            return NotFound(new { message = $"Request {id} not found." });

        _repository.Remove(request);
        await _repository.SaveChangesAsync();

        return Ok(new { message = "Request eliminada exitosamente.", id });
    }
}
