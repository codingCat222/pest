BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [passwordHash] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [fullName] NVARCHAR(1000) NOT NULL,
    [phone] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Technician] (
    [id] NVARCHAR(1000) NOT NULL,
    [fullName] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [phone] NVARCHAR(1000),
    [active] BIT NOT NULL CONSTRAINT [Technician_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Technician_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Technician_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Technician_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Product] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [category] NVARCHAR(1000) NOT NULL,
    [pestTarget] NVARCHAR(1000) NOT NULL,
    [regularPrice] FLOAT(53) NOT NULL,
    [deliveryCost] FLOAT(53) NOT NULL,
    [description] NVARCHAR(max) NOT NULL,
    [contents] NVARCHAR(max) NOT NULL,
    [instructions] NVARCHAR(max) NOT NULL,
    [safetyNotice] NVARCHAR(max) NOT NULL,
    [badge] NVARCHAR(1000),
    [imageUrl] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Product_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Product_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Case] (
    [id] NVARCHAR(1000) NOT NULL,
    [referenceNumber] NVARCHAR(1000) NOT NULL,
    [propertyName] NVARCHAR(1000) NOT NULL,
    [customerName] NVARCHAR(1000) NOT NULL,
    [customerEmail] NVARCHAR(1000) NOT NULL,
    [customerPhone] NVARCHAR(1000) NOT NULL,
    [propertyAddress] NVARCHAR(1000) NOT NULL,
    [postcode] NVARCHAR(1000) NOT NULL,
    [pest] NVARCHAR(1000) NOT NULL,
    [location] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Case_status_df] DEFAULT 'NEW',
    [productName] NVARCHAR(1000) NOT NULL,
    [deliveryFee] FLOAT(53) NOT NULL,
    [orderDate] DATETIME2 NOT NULL CONSTRAINT [Case_orderDate_df] DEFAULT CURRENT_TIMESTAMP,
    [trackingNumber] NVARCHAR(1000),
    [courier] NVARCHAR(1000),
    [monitoringDay] INT NOT NULL CONSTRAINT [Case_monitoringDay_df] DEFAULT 0,
    [monitoringDaysTotal] INT NOT NULL CONSTRAINT [Case_monitoringDaysTotal_df] DEFAULT 7,
    [activityReported] NVARCHAR(1000),
    [activityNotes] NVARCHAR(max),
    [lastReportedDate] DATETIME2,
    [appointmentDate] DATETIME2,
    [appointmentTime] NVARCHAR(1000),
    [appointmentStatus] NVARCHAR(1000),
    [technicianName] NVARCHAR(1000),
    [technicianNotes] NVARCHAR(max),
    [userId] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Case_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Case_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Case_referenceNumber_key] UNIQUE NONCLUSTERED ([referenceNumber])
);

-- CreateTable
CREATE TABLE [dbo].[TimelineEntry] (
    [id] NVARCHAR(1000) NOT NULL,
    [caseId] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL CONSTRAINT [TimelineEntry_date_df] DEFAULT CURRENT_TIMESTAMP,
    [completed] BIT NOT NULL CONSTRAINT [TimelineEntry_completed_df] DEFAULT 0,
    [current] BIT NOT NULL CONSTRAINT [TimelineEntry_current_df] DEFAULT 0,
    [details] NVARCHAR(max),
    [author] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [TimelineEntry_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [TimelineEntry_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Photo] (
    [id] NVARCHAR(1000) NOT NULL,
    [caseId] NVARCHAR(1000) NOT NULL,
    [url] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Photo_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Photo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ActivityReport] (
    [id] NVARCHAR(1000) NOT NULL,
    [caseId] NVARCHAR(1000) NOT NULL,
    [activityLevel] NVARCHAR(1000) NOT NULL,
    [notes] NVARCHAR(max),
    [photoUrl] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ActivityReport_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [ActivityReport_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Appointment] (
    [id] NVARCHAR(1000) NOT NULL,
    [caseId] NVARCHAR(1000) NOT NULL,
    [technicianId] NVARCHAR(1000),
    [date] DATETIME2 NOT NULL,
    [time] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Appointment_status_df] DEFAULT 'Scheduled',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Appointment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Appointment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ProofingQuote] (
    [id] NVARCHAR(1000) NOT NULL,
    [caseId] NVARCHAR(1000) NOT NULL,
    [reference] NVARCHAR(1000),
    [description] NVARCHAR(max) NOT NULL,
    [technicianExplanation] NVARCHAR(max) NOT NULL,
    [findings] NVARCHAR(max),
    [materials] NVARCHAR(1000),
    [materialsCost] FLOAT(53),
    [labourCost] FLOAT(53),
    [subtotal] FLOAT(53),
    [price] FLOAT(53),
    [vat] FLOAT(53) NOT NULL,
    [total] FLOAT(53) NOT NULL,
    [validUntil] DATETIME2 NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [ProofingQuote_status_df] DEFAULT 'pending',
    [acceptedAt] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ProofingQuote_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [ProofingQuote_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ProofingQuote_caseId_key] UNIQUE NONCLUSTERED ([caseId])
);

-- CreateTable
CREATE TABLE [dbo].[Order] (
    [id] NVARCHAR(1000) NOT NULL,
    [orderNumber] NVARCHAR(1000) NOT NULL,
    [caseId] NVARCHAR(1000) NOT NULL,
    [productName] NVARCHAR(1000) NOT NULL,
    [productPrice] FLOAT(53) NOT NULL,
    [deliveryFee] FLOAT(53) NOT NULL,
    [total] FLOAT(53) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Order_status_df] DEFAULT 'Preparing',
    [carrier] NVARCHAR(1000),
    [trackingNumber] NVARCHAR(1000),
    [placedDate] DATETIME2 NOT NULL CONSTRAINT [Order_placedDate_df] DEFAULT CURRENT_TIMESTAMP,
    [deliveryDate] DATETIME2,
    [propertyAddress] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Order_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Order_orderNumber_key] UNIQUE NONCLUSTERED ([orderNumber])
);

-- CreateTable
CREATE TABLE [dbo].[Document] (
    [id] NVARCHAR(1000) NOT NULL,
    [caseId] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [category] NVARCHAR(1000) NOT NULL,
    [format] NVARCHAR(1000) NOT NULL CONSTRAINT [Document_format_df] DEFAULT 'PDF',
    [date] DATETIME2 NOT NULL CONSTRAINT [Document_date_df] DEFAULT CURRENT_TIMESTAMP,
    [size] NVARCHAR(1000),
    [fileUrl] NVARCHAR(1000),
    CONSTRAINT [Document_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AuditLog] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000),
    [entityType] NVARCHAR(1000) NOT NULL,
    [entityId] NVARCHAR(1000) NOT NULL,
    [action] NVARCHAR(1000) NOT NULL,
    [details] NVARCHAR(max),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [AuditLog_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [AuditLog_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Case] ADD CONSTRAINT [Case_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TimelineEntry] ADD CONSTRAINT [TimelineEntry_caseId_fkey] FOREIGN KEY ([caseId]) REFERENCES [dbo].[Case]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Photo] ADD CONSTRAINT [Photo_caseId_fkey] FOREIGN KEY ([caseId]) REFERENCES [dbo].[Case]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ActivityReport] ADD CONSTRAINT [ActivityReport_caseId_fkey] FOREIGN KEY ([caseId]) REFERENCES [dbo].[Case]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_caseId_fkey] FOREIGN KEY ([caseId]) REFERENCES [dbo].[Case]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_technicianId_fkey] FOREIGN KEY ([technicianId]) REFERENCES [dbo].[Technician]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProofingQuote] ADD CONSTRAINT [ProofingQuote_caseId_fkey] FOREIGN KEY ([caseId]) REFERENCES [dbo].[Case]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [Order_caseId_fkey] FOREIGN KEY ([caseId]) REFERENCES [dbo].[Case]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Document] ADD CONSTRAINT [Document_caseId_fkey] FOREIGN KEY ([caseId]) REFERENCES [dbo].[Case]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AuditLog] ADD CONSTRAINT [AuditLog_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
