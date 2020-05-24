using System.IO;
using BusinessLogic;
using BusinessLogic.FileHandling;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Model;
using Persistence;
using TegridyGardener.WebAPI.Hubs;

namespace TegridyGardener.WebAPI
{
    public class Startup
    {
        private const string _corsPolicyName = "AllowAll";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddTransient<IPlantCrudService, PlantCrudService>();
            services.AddTransient<IPlantScheduledActionService, PlantsScheduledActionService>();
            services.AddTransient<IPlantsGroupService, PlantsGroupService>();
            services.AddTransient<IFileHandler, FileHandler>();
            services.AddTransient<IPlantInfoService, PlantInfoService>();
            services.AddTransient<IUserAuthService, UserAuthService>();
            services.AddTransient<IPlantsRulesService, PlantsRulesService>();
            
            services.AddDbContext<TegridyDbContext>
            (options =>
                //options.UseSqlServer(Configuration["ConnectionString:master"]));
                options.UseInMemoryDatabase("TegridyDbContex"));
            
                    services.Configure<FormOptions>(o => {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });
              
            services.AddCors(options =>
            {
                options.AddPolicy(
                    _corsPolicyName,
                    x =>
                    {
                        x.AllowAnyHeader()
                            .AllowAnyMethod()
                            .SetIsOriginAllowed(_ => true)
                            .AllowCredentials();
                    });
            });

            services.AddSignalR();
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
//                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
//                RequestPath = new PathString("/Resources")
            });

            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"); });

            app.UseCors();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<PlantsActionsHub>("/plantsActionsHub");
            });
        }
    }
}