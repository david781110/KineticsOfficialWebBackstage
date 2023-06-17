using KineticsOfficialWebBackstage.Data;
using KineticsOfficialWebBackstage.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

var KineticsOfficialWebBackstageconnectionString = builder.Configuration.GetConnectionString("KineticsOfficialWebBackstageConnection");
builder.Services.AddDbContext<KineticsOfficialWebBackstageContext>(options =>
    options.UseSqlServer(KineticsOfficialWebBackstageconnectionString));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddControllersWithViews();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                              .AddCookie(options => {
                                  // 以下這兩個設定可有可無
                                  options.AccessDeniedPath = "/Home/AccessDeny";   // 拒絕，不允許登入，會跳到這一頁。
                                  options.LoginPath = "/Members/Login";     // 登入頁。
                              });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Members}/{action=Login}/{id?}");
app.MapRazorPages();

app.Run();
