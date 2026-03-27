namespace Syncflow.API.Application.Processors;

public interface IRequestProcessor
{
    string Process(string payload);
}
