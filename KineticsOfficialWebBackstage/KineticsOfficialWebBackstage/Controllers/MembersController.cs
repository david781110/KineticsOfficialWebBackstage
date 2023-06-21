using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using KineticsOfficialWebBackstage.Models;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

namespace KineticsOfficialWebBackstage.Controllers
{
    public class MembersController : Controller
    {
        private readonly KineticsOfficialWebBackstageContext _db;

        public MembersController(KineticsOfficialWebBackstageContext context)
        {
            _db = context;
        }

        // GET: Members
        public IActionResult Login()
        {
              return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Login(Member _User)
        {
            if (_User.Password == null)
            {
                return View();
            }
            using (MD5 md5Hash = MD5.Create())
            {
                string hash = MyLogin.GetMd5Hash(md5Hash, _User.Password);

                var ListOne = from m in _db.Member
                              where m.Name == _User.Name && m.Password == hash
                              select m;

                Member _result = ListOne.FirstOrDefault();


                if (_result == null)
                {   // 找不到這一筆記錄（帳號與密碼有錯，沒有這個會員）
                    //return HttpNotFound();
                    ViewData["ErrorMessage"] = "帳號與密碼有錯";
                    return View();
                }
                else
                {   //*************************************************************(start)

                    #region ***** 不使用ASP.NET Core Identity的 cookie 驗證 *****
                    var claims = new List<Claim>   // 搭配 System.Security.Claims; 命名空間
                    {
                        new Claim(ClaimTypes.Name, _User.Name),
                        // 讀取後的結果是「CLAIM TYPE: http://schemas.xmlsoap.org/ws/2008/06/identity/claims/name; CLAIM VALUE: 你輸入的數值」
                        /*new Claim("SelfDefine_LastName", _result.Id.ToString()),*/    // ID編號
                        // 讀取後的結果是 CLAIM TYPE: SelfDefine_LastName（自定義的「欄位」名稱）;   CLAIM VALUE: 你輸入的「數值」
                        // *** 重點！ _result 才是從 DbUser資料表讀出的數值。
                        //      千萬不能寫成 _User不然就會變成從Login畫面傳來的輸入值 ***

                        /*new Claim(ClaimTypes.Role, _result.Status.ToString())*/   // ***********    
                        // *** 如果要有「群組、角色、權限」，可以加入這一段 *********
                        // 讀取後的結果是「CLAIM TYPE: http://schemas.microsoft.com/ws/2008/06/identity/claims/role; CLAIM VALUE: Administrator」
                    };

                    // 底下的 ** 登入 Login ** 需要下面兩個參數 (1) claimsIdentity  (2) authProperties
                    var claimsIdentity = new ClaimsIdentity(claims,
                                                                                               CookieAuthenticationDefaults.AuthenticationScheme);

                    var authProperties = new AuthenticationProperties
                    {
                        //AllowRefresh = <bool>,
                        // Refreshing the authentication session should be allowed.

                        ExpiresUtc = DateTimeOffset.UtcNow.AddMonths(1),   // 從現在算起，Cookie何時過期
                                                                             // The time at which the authentication ticket expires. A 
                                                                             // value set here overrides the ExpireTimeSpan option of 
                                                                             // CookieAuthenticationOptions set with AddCookie.

                        //IsPersistent = true,
                        // Whether the authentication session is persisted across 
                        // multiple requests. When used with cookies, controls
                        // whether the cookie's lifetime is absolute (matching the
                        // lifetime of the authentication ticket) or session-based.

                        //IssuedUtc = <DateTimeOffset>,
                        // The time at which the authentication ticket was issued.

                        //RedirectUri = <string>
                        // The full path or absolute URI to be used as an http 
                        // redirect response value.
                    };

                    // *** 登入 Login *********
                    HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                                                            new ClaimsPrincipal(claimsIdentity),
                                                            authProperties);
                    #endregion

                    //return Content("<h3>恭喜您，登入成功</h3>");
                    // return LocalRedirect(Url.GetLocalUrl(returnUrl));  // 登入成功後，返回原本的網頁
                    //HttpContext.Session.SetString("_UserId", _result.UserId.ToString());
                    //HttpContext.Session.SetString("_Name", _result.Name.ToString());
                    //HttpContext.Session.SetString("Login", "OK");

                    //TempData["Loginnnn"] = "OK";
                    TempData["Name"] =_result.Name.ToString();


                    return RedirectToAction("Index", "Home"); // 登入成功後，自動跳去 Index2網頁
                                                                      //return RedirectToLocal();
                                                                      // 完成這個範例以後，您可以參考這篇文章 - OWIN Forms authentication（作法很類似）
                                                                      // https://blogs.msdn.microsoft.com/webdev/2013/07/03/understanding-owin-forms-authentication-in-mvc-5/

                }


            }
        }
        public async Task<IActionResult> Logout()
        {
            // 自己宣告 Microsoft.AspNetCore.Authentication.Cookies; 命名空間
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            //return View();
            return RedirectToAction("Login", "Members");   // 登出，跳去另一頁。
        }


    }
}
