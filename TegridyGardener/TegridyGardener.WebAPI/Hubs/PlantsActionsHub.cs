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
            InvokeActionForClients(actionId,1);
        }

        public async Task UpdateActionResult(int actionId, bool status)
        {
            Clients.All.SendAsync("updateActionResult", actionId.ToString());
        }

        private void InvokeActionForClients(int actionId, int clientId)
        {
            Clients.All.SendAsync("invokeAction", actionId.ToString());
        }
    }
}