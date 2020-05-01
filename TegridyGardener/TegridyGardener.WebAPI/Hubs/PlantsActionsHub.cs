using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace TegridyGardener.WebAPI.Hubs
{
    public class PlantsActionsHub : Hub
    {
        public async Task SubscribeToPlantsActions()
        {                     
        }
        
        public async Task InvokeAction(int actionId)
        {
            Clients.All.SendAsync("invokeAction", actionId.ToString());
        }
    }
}