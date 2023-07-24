use [WebAppProject];
DELETE FROM Evaluacion;

select * from [dbo].[Usuarios];
select * from [dbo].[Colaborador];
select * from [dbo].[Roles];

select * from [dbo].[Evaluacion];
select * from [dbo].[PreguntasByEvaluacion];
select * from [dbo].[ModuloEvaluacion];
select * from [dbo].[Tipo_Evaluacion];
select * from [dbo].[PreguntasEvaluacion];

select * from [dbo].[PreguntasByEvaluacion] where Tipo_Evaluacion_Id = 2 and Modulo_Id = 4;

UPDATE Colaborador set Estado = 'Evaluado' where Id_Colaborador in (2037)
update Usuarios set Identificacion = '0931694848' where Id_Usuario = 1021;

1,2,3,4,5,6,7,16, 23, 24,25
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

INSERT INTO [dbo].[Usuarios] (Usuario, Password, Fecha_Creacion, Identificacion, Tipo_Evaluacion_Id, Rol_Id,RolesModelId_Rol)
VALUES ('dsmales','12345', GETDATE(), '0987654321', 2, 2,2);

INSERT INTO Roles (Nombre_Rol, Fecha_Creacion)
VALUES ('usuario', GETDATE())

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 1', GETDATE(),4,1,2);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 2', GETDATE(),4,2,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 3', GETDATE(),4,3,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 4', GETDATE(),4,4,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 5', GETDATE(),4,5,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 6', GETDATE(),4,6,3);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 7', GETDATE(),4,7,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 8', GETDATE(),4,8,2);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 9', GETDATE(),4,9,2);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 10', GETDATE(),4,10,2);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (5,'Pregunta 11', GETDATE(),4,11,2);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (5,'Pregunta 12', GETDATE(),4,12,2);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (5,'Pregunta 13', GETDATE(),4,13,2);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (5,'Pregunta 14', GETDATE(),4,14,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 15', GETDATE(),4,15,2);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 16', GETDATE(),4,16,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 17', GETDATE(),4,17,2);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (5,'Pregunta 18', GETDATE(),4,18,2);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (5,'Pregunta 19', GETDATE(),4,19,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (5,'Pregunta 20', GETDATE(),4,20,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (5,'Pregunta 21', GETDATE(),4,21,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (5,'Pregunta 22', GETDATE(),4,22,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 23', GETDATE(),4,23,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 24', GETDATE(),4,24,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 25', GETDATE(),4,25,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (4,'Pregunta 26', GETDATE(),4,26,2);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (5,'Pregunta 27', GETDATE(),4,27,2);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (5,'Pregunta 28', GETDATE(),4,28,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (5,'Pregunta 29', GETDATE(),4,29,3);
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (5,'Pregunta 30', GETDATE(),4,30,3);

DELETE FROM Colaborador;

INSERT INTO [dbo].[PreguntasEvaluacion] (Pregunta,Fecha_Creacion)
VALUES ('Elegir el tipo de dato correcto', GETDATE());

INSERT INTO [dbo].[Colaborador] (Nombres, Apellidos)
VALUES ('prueba colaborador','prueba colaborador');

INSERT INTO [dbo].[ModuloEvaluacion] (Nombre_Modulo, Definicion, Fecha_Creacion)
VALUES ('Modulo Prueba','Primer modulo creado',GETDATE() );

delete from [dbo].[PreguntasByEvaluacion] where Id_Preguntas_Tipo in (2,4,5,6,7,8,9,10);

update [dbo].[PreguntasByEvaluacion] set Modulo_Id = 1 where Id_Preguntas_Tipo = 29;

update Colaborador set Estado = 'No Evaluado' where Id_Colaborador in (4,5,6,7,8,9,10,11,1003,1004);

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
