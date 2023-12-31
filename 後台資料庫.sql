USE [master]
GO
/****** Object:  Database [KineticsOfficialWebBackstage]    Script Date: 2023/6/17 下午 04:49:39 ******/
CREATE DATABASE [KineticsOfficialWebBackstage]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'KineticsOfficialWebBackstage', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\KineticsOfficialWebBackstage.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'KineticsOfficialWebBackstage_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\KineticsOfficialWebBackstage_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [KineticsOfficialWebBackstage].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET ARITHABORT OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET  DISABLE_BROKER 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET RECOVERY FULL 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET  MULTI_USER 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET DB_CHAINING OFF 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'KineticsOfficialWebBackstage', N'ON'
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET QUERY_STORE = ON
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [KineticsOfficialWebBackstage]
GO
/****** Object:  Table [dbo].[Member]    Script Date: 2023/6/17 下午 04:49:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Member](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Password] [nvarchar](50) NULL,
	[Status] [int] NULL,
 CONSTRAINT [PK_Member] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Member] ON 

INSERT [dbo].[Member] ([UserID], [Name], [Password], [Status]) VALUES (1, N'KTC', N'1b4a5c195c93a4a5836a1d0bc7eee9cd', 10)
SET IDENTITY_INSERT [dbo].[Member] OFF
GO
ALTER TABLE [dbo].[Member] ADD  CONSTRAINT [DF_Member_Status]  DEFAULT ((10)) FOR [Status]
GO
USE [master]
GO
ALTER DATABASE [KineticsOfficialWebBackstage] SET  READ_WRITE 
GO
