﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KineticsOfficialWebBackstage.Models
{
    public partial class Member
    {
        public int UserId { get; set; }

        [Required(ErrorMessage ="帳號或密碼有誤")]
        [Display(Name ="帳號")]
        public string Name { get; set; }

        [Required(ErrorMessage = "帳號或密碼有誤")]
        [Display(Name = "密碼")]
        public string Password { get; set; }
        public int? Status { get; set; }
    }
}