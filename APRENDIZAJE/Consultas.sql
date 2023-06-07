use [WebAppProject];

select * from [dbo].[Usuarios];
select * from [dbo].[Colaborador];
select * from [dbo].[Roles];

select * from [dbo].[Evaluacion];
select * from [dbo].[PreguntasByEvaluacion];
select * from [dbo].[ModuloEvaluacion];
select * from [dbo].[Tipo_Evaluacion];
select * from [dbo].[PreguntasEvaluacion];

--CREATE PROCEDURE P_VALIDAR_USUARIO
--@Usuario VARCHAR(100),
--@Password VARCHAR(100)
--AS
--BEGIN
--  SELECT * FROM Usuarios WHERE Usuario=@Usuario AND Password=@Password
--END



UPDATE [dbo].[Usuarios]
SET Identificacion = '1234567890'
WHERE Id_Usuario in (3, 4, 5, 6,7,8,9,10,11,1002);

INSERT INTO [dbo].[Usuarios] (Usuario, Password, Fecha_Creacion, Identificacion, Tipo_Evaluacion_Id)
VALUES ('daniel','12345', GETDATE(), '0987654321', 2);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Tipo_Evaluacion_Id, Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, TipoEvaluacionModelId_Tipo_Evaluacion)
VALUES (2,3,'Pregunta 10', GETDATE(),3,2);

DELETE FROM Usuarios;

INSERT INTO [dbo].[PreguntasEvaluacion] (Pregunta,Fecha_Creacion)
VALUES ('Elegir el tipo de dato correcto', GETDATE());

INSERT INTO [dbo].[Colaborador] (Nombres, Apellidos)
VALUES ('prueba colaborador','prueba colaborador');

INSERT INTO [dbo].[ModuloEvaluacion] (Nombre_Modulo, Definicion, Fecha_Creacion)
VALUES ('Modulo Prueba','Primer modulo creado',GETDATE() );

delete from [dbo].[PreguntasByEvaluacion] where Id_Preguntas_Tipo in (2,4,5,6,7,8,9,10);

INSERT INTO [dbo].[Evaluacion] (Usuario_id, Fecha_Creacion, Colaborador_id, PreguntasByEvaluacionModelId_Preguntas_Tipo ,Preguntas_Tipo_id,CalificacionFinal, ColaboradorModelId_Colaborador, [UsuariosModelId_Usuario])
VALUES (3, GETDATE(),5, 2 ,2,1.5,5 ,4);

--Relacion usuarios y colaboradores
SELECT usr.*, clb.Nombres as nombres_usuario, clb.Apellidos as apellidos_usuario
FROM [dbo].[Usuarios] usr 
JOIN [dbo].[Colaborador] clb ON clb.Id_Colaborador = usr.Id_Colaborador;

--Relacion Tipo_Evaluacion y Evaluacion
SELECT ev.*, ev.Fecha_Creacion as fecha_evaluacion, tpe.Nombre_Tipo as tipoEvaluacion
FROM [dbo].[Tipo_Evaluacion] tpe 
JOIN [dbo].[Evaluacion] ev ON ev.Id_Tipo_Evaluacion = tpe.Id_Tipo_Evaluacion;



INSERT INTO [dbo].[Tipo_Evaluacion] (Nombre_Tipo, Fecha_Creacion)
VALUES ('CONTRIBUIDOR INDIVIDUAL', GETDATE());

INSERT INTO [dbo].[Evaluacion] ([Id_Tipo_Evaluacion], [Pregunta], [Competencia], [Definicion], [Fecha_Creacion])
VALUES (2,'Implementa estrategias de atracción y fidelización de clientes.', 'GESTIÓN DEL SERVICIO & CLIENTES', 'Enfoca su trabajo y actividades a través de la identificación de las necesidades de los clientes, atendiendo sus requerimientos de forma oportuna, con calidad y efectividad.'
,GETDATE());
