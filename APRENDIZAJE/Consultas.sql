use [WebAppProject];
DELETE FROM Evaluacion;
select * from [dbo].[Cargos]
select * from [dbo].[Usuarios];
select * from [dbo].[Colaborador];
select * from [dbo].[Roles];

select * from Colaborador where Estado in ('Borrador', 'Evaluado')

select * from [dbo].[Usuarios] where Id_Usuario in (1027,
1028,
1039);

select * from Evaluacion where Colaborador_id in (
3029,
3032,
3036);
update Evaluacion set Estado = 'Realizada' where Id_Evaluacion = 2099;

select * from Colaborador where Nombres in ('DANIEL MALES');

delete from Colaborador where Id_Colaborador in ();


update Usuarios set Cargo_Id = 1, CargosModelId_Cargo = 1 WHERE Id_Usuario = 1028;

insert into Usuarios (Usuario, Password, Fecha_Creacion, Identificacion, Rol_Id, RolesModelId_Rol, Cargo_Id,CargosModelId_Cargo, Grupo)
values(
'prueba',
'12345',
GETDATE(),
'1234567891',
1,
1,
1,
1,
'EQUIPO'

)

select * from [dbo].[Evaluacion];
select * from ObservacionEvaluacion;
select * from [dbo].[PreguntasByEvaluacion];
select * from ObservacionEvaluacion;
select * from [dbo].[ModuloEvaluacion];

select * from [dbo].[PreguntasModuloCargo];

select * from [dbo].[TipoCompetencia]
select * from [dbo].[PreguntasByEvaluacion];

select * from [dbo].[PreguntasByEvaluacion] where Pregunta = 'Analiza, determina y cuestiona la viabilidad de aplicación de mejoras o cambios en los procesos, procedimientos, técnicas, sistemas  y otros, aplicando la lógica.'

select * from [dbo].[PreguntasByEvaluacion] where Pregunta = 'Resuelve problemas de forma eficaz, mediante la identificación y el análisis de las causas, brindando una solución efectiva y mejoras para prever y evitar problemáticas futuras.'


UPDATE PreguntasByEvaluacion
SET [Pregunta] = 'Resuelve problemas de forma eficaz, mediante la identificación y el análisis de las causas, brindando una solución efectiva y mejoras para prever y evitar problemáticas futuras.'
where Id_Preguntas_Tipo = 1111


UPDATE PreguntasByEvaluacion
SET [Pregunta] = 'Analiza, determina y cuestiona la viabilidad de aplicación de mejoras o cambios en los procesos, procedimientos, técnicas, sistemas  y otros, aplicando la lógica.'
where Id_Preguntas_Tipo = 1110


--delete from ModuloEvaluacion

insert into ModuloEvaluacion (Nombre_Modulo, Definicion, Fecha_Creacion, TipoEvaluacionModelId_Tipo_Evaluacion, Tipo_Evaluacion_Id, TipoCompetenciaId_Tipo_Competencia
,Tipo_Competencia_Id) values (
'Instrucción y Entrenamiento',
'Es capacitar de manera individual o a grupos, cómo realizar alguna actividad, mediante la asignación de prácticas y delegación de responsabilidades para que tengan  sentido del compromiso, participen, asuman riesgos, y sean responsables de cumplir con sus indicadores de gestión. Incluye fomentar el trabajo en equipo y facilitar el uso eficiente de los recursos y equipos.',
GETDATE(),
2,
2,
3,
3
)
select * from [dbo].[ModuloEvaluacion];


UPDATE ModuloEvaluacion set
Nombre_Modulo = 'Orientación al Servicio'
where Id_Modulo_Evaluacion = 1024




insert into TipoCompetencia (Nombre, Peso_Tipo_Competencia) values
(
'COMPETENCIAS ORGANIZACIONALES',
20

)

insert into TipoCompetencia (Nombre, Peso_Tipo_Competencia) values
(
'COMPETENCIAS ESTRATÉGICAS Y GESTIÓN',
50

)

insert into TipoCompetencia (Nombre, Peso_Tipo_Competencia) values
(
'COMPETENCIAS FUNCIONALES',
30

)


update Usuarios set Rol_Id = 2, RolesModelId_Rol = 2 where Id_Usuario in (1028,
1029,
1030,
1031,
1032,
1033,
1034)

select * from [dbo].[Cargos]

select * from [dbo].[PreguntasModuloCargo];
select * from [dbo].[Tipo_Evaluacion];
select * from [dbo].[ModuloEvaluacion];

UPDATE PreguntasModuloCargo set
Modulo_Id = 1020,
Tipo_Evaluacion_Id = 4
where Id_PreguntaModuloCargo = 61




insert into [dbo].[PreguntasModuloCargo] (Modulo_Id, Cargo_Id, Tipo_Evaluacion_Id)
values
(
1022,6,3
);


insert into [dbo].[PreguntasModuloCargo] (Modulo_Id, Cargo_Id, Tipo_Evaluacion_Id)
values
(
1013,8,3
);


insert into [dbo].[PreguntasModuloCargo] (Modulo_Id, Cargo_Id, Tipo_Evaluacion_Id)
values
(
1014,8,4
);


insert into [dbo].[PreguntasModuloCargo] (Modulo_Id, Cargo_Id, Tipo_Evaluacion_Id)
values
(
1009,8,3
);

insert into [dbo].[PreguntasModuloCargo] (Modulo_Id, Cargo_Id, Tipo_Evaluacion_Id)
values
(
1007,8,4
);

insert into [dbo].[PreguntasModuloCargo] (Modulo_Id, Cargo_Id, Tipo_Evaluacion_Id)
values
(
1008,8,3
);


insert into [dbo].[PreguntasModuloCargo] (Modulo_Id, Cargo_Id, Tipo_Evaluacion_Id)
values
(
1010,8,2
);

insert into [dbo].[PreguntasModuloCargo] (Modulo_Id, Cargo_Id, Tipo_Evaluacion_Id)
values
(
1008,8,3
);

--delete from Usuarios where Id_Usuario in (1025,1026)

select * from [dbo].[PreguntasByEvaluacion] where Modulo_Id = 5 and Tipo_Evaluacion_Id = 2;

insert into Usuarios (Identificacion, Usuario, Password,Fecha_Creacion, Tipo_Evaluacion_Id, Rol_Id, RolesModelId_Rol, Cargo_Id, [CargosModelId_Cargo])
values ('0931694848', 'Auxiliar', '12345', GETDATE(), 2, 1, 1,8,8)


update Usuarios  set Tipo_Evaluacion_Id = 3 where Id_Usuario = 1022

UPDATE Tipo_Evaluacion set Nombre_Tipo = 'Basico' where Id_Tipo_Evaluacion =4;

update PreguntasByEvaluacion set Tipo_Evaluacion_Id =2
where Id_Preguntas_Tipo = 65


delete from Usuarios

--delete from Tipo_Evaluacion where Id_Tipo_Evaluacion in (5,6,7,8,9)

insert into Tipo_Evaluacion (Nombre_Tipo, Fecha_Creacion) values ('AUX/ASIST', GETDATE())

update evaluacion set Estado = 'Borrador' where Id_Evaluacion = 2092;

UPDATE ModuloEvaluacion set Nombre_Modulo = 'Desarrollo estratégico del Talento Humano', Definicion = 'Es la capacidad para dirigir, analizar y evaluar el desempeño actual y potencial de los colaboradores y definir e implementar acciones de desarrollo para las personas y equipos en el marco de las estrategias de la organización, adoptando un rol de facilitador y guía' where Id_Modulo_Evaluacion = 5;

insert into ModuloEvaluacion (Nombre_Modulo, Definicion, Fecha_Creacion, TipoEvaluacionModelId_Tipo_Evaluacion, Tipo_Evaluacion_Id, Peso_Modulo, TipoCompetenciaId_Tipo_Competencia, Tipo_Competencia_Id)
values('Liderazgo',
'Es la capacidad de ejercer influencia sobre otras personas, motivándolos e incentivándolos para que trabajen de manera colaborativa por un objetivo común. Guía e inspira al grupo, dando ejemplo y tomando decisiones acertadas, busca la innovación al realizar las actividades y se exige para obtener mejores resultados.',
GETDATE(),2,2)


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


select * from [dbo].[Tipo_Evaluacion];
select * from [dbo].[ModuloEvaluacion];
select * from [dbo].[PreguntasByEvaluacion]



INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1015,'Direcciona y guía adecuadamente a los colaboradores hacia el logro de los objetivos definidos. Entrena y desarrolla los conocimientos y capacidades requeridas para los colaboradores según su rol. Delega y brinda seguimientos a la gestión de su equipo.',
GETDATE(),1015,1,1);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1015,'Guía y motiva al equipo hacia el logro de los objetivos, trabajando de manera conjunta, mostrando compromiso constante e interés por la mejora continua. Fomenta el trabajo colaborativo para alcanzar los objetivos trazados del equipo.',
GETDATE(),1015,2,2);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1015,'Motiva a los demás en el desarrollo de sus actividades y logra persuadirlos para actuar en búsqueda de resultados que generen mayor valor.',
GETDATE(),1015,3,3);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1015,'Influencia a un grupo determinado de personas mediante comunicación efectiva. Fomenta el trabajo colaborativo para alcanzar los objetivos trazados del equipo.',
GETDATE(),1015,4,4);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1016,'Investiga constantemente y asimila rápidamente los cambios del entorno y mercado, las oportunidades, amenazas, fortalezas y debilidades de su organización / unidad o proceso/ proyecto y propone directrices estratégicas y define planes de acción. Genera ideas nuevas, diferentes o inusuales en respuesta a problemas o desafíos.',
GETDATE(),1016,5,1);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1016,'Comprende los cambios del entorno y está en la capacidad de promover planes  y programas de innovación para ser introducidos como parte de la cultura de la empresa. Crea soluciones únicas y novedosas en lugar de simplemente seguir fórmulas o métodos preestablecidos. Aborda problemas complicados y encuentra soluciones creativas y eficientes.',
GETDATE(),1016,6,2);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1016,'Puede adaptarse fácilmente a diferentes situaciones y adoptar perspectivas diversas para abordar un problema. Puede hacer conexiones inesperadas entre conceptos aparentemente no relacionados, lo que puede llevar a soluciones innovadoras. Puede lidiar con la incertidumbre y la falta de estructura en un problema.',
GETDATE(),1016,7,3);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1016,'Puede adecuarse a los cambios y participa en el desarrollo de planes y  programas de innovación y de creación de valor para el negocio.',
GETDATE(),1016,8,4);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1017,'Anticipa los puntos críticos de una situación o problema, desarrollando estrategias a largo plazo, acciones de control, mecanismos de coordinación y verificando información para la aprobación de diferentes proyectos, programas y otros. Es capaz de administrar simultáneamente diversos proyectos complejos.',
GETDATE(),1017,9,1);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1017,'Planifica y organiza los procesos, enfoca sus actividades y esfuerzo en el trabajo en equipo para el logro de los objetivos, cumpliendo eficientemente con los plazos y calidad esperados.',
GETDATE(),1017,10,2);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1017,'Administra simultáneamente diversos proyectos de complejidad media, estableciendo estrategias de corto y mediano plazo, mecanismos de coordinación y control de la información.',
GETDATE(),1017,11,3);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1017,'Establece objetivos y plazos para la realización de las tareas o actividades, define prioridades, controlando la calidad del trabajo y verificando la información para asegurarse de que se han ejecutado las acciones previstas.',
GETDATE(),1017,12,4);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1018,'Resuelve problemas de forma eficaz, mediante la identificación y el análisis de las causas, brindando una solución efectiva y mejoras para prever y evitar problemáticas futuras.',
GETDATE(),1018,13,1);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1018,'Analiza, determina y cuestiona la viabilidad de aplicación de mejoras o cambios en los procesos, procedimientos, técnicas, sistemas  y otros, aplicando la lógica.',
GETDATE(),1018,14,2);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1018,'Elabora reportes aplicando el análisis y la lógica, Identifica pautas, tendencias o algunas de la información que maneja.',
GETDATE(),1018,15,3);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1018,'Discrimina y prioriza entre las actividades asignadas aplicando la lógica.',
GETDATE(),1018,16,4);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1019,'Realiza análisis extremadamente complejos, organizando, secuenciando, y analizando sistemas interdependientes de alta complejidad.',
GETDATE(),1019,17,1);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1019,'Realiza análisis complejos desagregando problemas en sus partes componentes. Es capaz de comunicar claramente sus conclusiones y hacerlas comprensibles a otros.',
GETDATE(),1019,18,2);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1019,'Analiza y establece relaciones sencillas entre los datos para descomponer  los problemas o situaciones en partes. Identifica los pros y los contras de las decisiones. Analiza información  sencilla.',
GETDATE(),1019,19,3);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1019,'Realiza una lista de asuntos a tratar asignando un orden o prioridad determinados. Establece prioridades en las actividades que realiza.',
GETDATE(),1019,20,4);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1020,'Define las tareas, asigna los recursos necesarios (humanos y materiales) para las mismas y planifica los métodos por medio de los cuales se podrán llevar a cabo.',
GETDATE(),1020,21,1);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1020,'Diseña o rediseña la estructura, los procesos organizacionales y las atribuciones y responsabilidades de los puestos de trabajo.',
GETDATE(),1020,22,2);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1020,'Diseña o rediseña los procesos de las tareas de su área de trabajo, para generar mayor productividad.',
GETDATE(),1020,23,3);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1020,'Identifica el flujo de trabajo. Propone cambios para agilitar las actividades laborales y aumentar la productividad.',
GETDATE(),1020,24,4);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1021,'Desempeña las tareas con dedicación, cuidando cumplir tanto con los plazos como con la calidad requerida y aspirando a alcanzar el mejor resultado posible. Su responsabilidad está por encima de lo esperado en su nivel o posición.',
GETDATE(),1021,25,1);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1021,'Cumple con los plazos preestablecidos en la calidad requerida, preocupándose de lograrlo sin necesidad de recordatorios o consignas especiales.',
GETDATE(),1021,26,2);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1021,'Cumple los plazos tomando todos los márgenes de tolerancia previstos y la calidad mínima necesaria para cumplir el objetivo',
GETDATE(),1021,27,3);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1021,'Cumple los plazos o alcanza la calidad de las tareas y requerimientos asignadas',
GETDATE(),1021,28,4);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1022,'Se asegura de que la presentación de los productos contengan las respuestas que los clientes  esperan escuchar, anticipándose a posibles objeciones. Despierta interés, entusiasmo y credibilidad, y obtiene un firme compromiso de los clientes.',
GETDATE(),1022,29,1);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1022,'Presenta y comunica claramente los beneficios de los productos, centrándose en los aspectos de la propuesta que responden a los objetivos del cliente y resuelven satisfactoriamente sus problemas actuales. Provoca un fuerte impacto e interés por la propuesta.',
GETDATE(),1022,30,2);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1022,'Presenta y comunica claramente las especificaciones de cada producto y servicios del punto de venta, haciendo hincapié en los beneficios que su propuesta creará al cliente. Utiliza adecuadamente estrategias de persuasión. Cuando no tiene una respuesta se compromete a buscar alternativas de productos, para proporcionarla lo más rápido posible.',
GETDATE(),1022,31,3);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1022,'Comunica claramente los beneficios de los productos, haciendo hincapié en los aspectos  positivos de los productos de la compañía. Cuando no tiene una respuesta se compromete a buscar alternativas de productos, para proporcionarla lo más rápido posible.',
GETDATE(),1022,32,4);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1027,'Capacita a los colaboradores y compañeros de la institución',
GETDATE(),1027,33,1);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1027,'Planifica constantemente las capacitaciones, inducciones y entrenamientos para el personal nuevo o de educación continua, se capacita e investiga constantemente nuevas técnicas que le permitan mantenerse actualizado sobre los procedimientos y procesos técnicos del área comercial para capacitar de manera efectiva a los colaboradores de dicha área.',
GETDATE(),1027,34,2);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1027,'Capacita y fomenta el trabajo en equipo y facilita el uso eficiente de los recursos y equipos.',
GETDATE(),1027,35,3);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1027,'Instruye a un compañero sobre la forma de operar un programa de computación.',
GETDATE(),1027,36,4);
-------------------------------------------------------------------

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1023,'Crea un buen clima de trabajo y espíritu de cooperación. Resuelve los conflictos que se puedan producir dentro del equipo. Se considera que es un referente en el manejo de equipos de trabajo. Promueve el trabajo en equipo con otras áreas de la organización.',
GETDATE(),1023,37,1);

-----------
INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1023,'Promueve la colaboración de los distintos integrantes del equipo. Valora las ideas y experiencias de los demás. Anima, motiva y desarrolla el espíritu de equipo. Actúa para desarrollar un ambiente de trabajo amistoso, buen clima y espíritu de cooperación. Resuelve los conflictos que se puedan producir dentro del equipo.',
GETDATE(),1023,38,2);
---------------------------



INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1023,'Solicita la opinión al resto del grupo. Valora  las ideas y experiencia de los demás; mantiene una actitud abierta para aprender de los otros, incluso sus pares y subordinados. Promueve la colaboración de los distintos equipos, dentro de ellos y entre ellos. Valora las contribuciones de los demás aunque tengan diferentes puntos de vista.',
GETDATE(),1023,39,3);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1023,'Coopera, participa activamente en el equipo, apoya a las decisiones. Realiza la parte del trabajo que le corresponde. Como miembro de un equipo, mantiene informados a los demás. Comparte información.',
GETDATE(),1023,40,4);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1024,'Lidera los planes de acción enfocados a la satisfacción y cumplimiento de las expectativas de los clientes. Crea espacios que promueven e incentiven al equipo a buscar y proponer nuevas soluciones y/o respuestas enfocadas a la ayuda y satisfacción de las necesidades de los clientes.',
GETDATE(),1024,41,1);


INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1024,'Demuestra interés en atender a los clientes internos o externos con rapidez, diagnostica correctamente la necesidad y plantea soluciones adecuadas.',
GETDATE(),1024,42,2);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1024,'Identifica las necesidades del cliente interno o externo; en ocasiones se anticipa a ellos, aportando soluciones a la medida de sus requerimientos.',
GETDATE(),1024,43,3);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1024,'Actúa a partir de los requerimientos de los clientes, ofreciendo propuestas estandarizadas a sus demandas.',
GETDATE(),1024,44,4);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1025,'Lidera los planes de acción, promoviendo el alcance y logro de las metas definidas al equipo. Delega y distribuye responsabilidades a su equipo, brindando un seguimiento continuo a la gestión. Clarifica los objetivos, estableciendo metas e indicadores de resultados a su equipo.',
GETDATE(),1025,45,1);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1025,'Actúa para lograr y superar estándares de desempeño y plazos establecidos, fijándose para sí y/o para los demás ciertos parámetros que se deben alcanzar. Trabajo con objetivos claramente establecidos, realistas y desafiantes. Utiliza indicadores de gestión para medir y comparar los resultados obtenidos.',
GETDATE(),1025,46,2);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1025,'Actúa con precisión garantizando la calidad de sus resultados. Modifica los métodos de trabajo para conseguir mejoras. Actúa para lograr y superar niveles de desempeño y plazos establecidos.',
GETDATE(),1025,47,3);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1025,'Muestra una buena actitud y es enérgico en el logro de sus actividades. Cumple con las actividades y tareas de forma oportuna.',
GETDATE(),1025,48,4);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1026,'Gestiona y promueve la diversidad en el lugar de trabajo para aumentar el retorno de la inversión, genera ideas innovadoras y fomenta un ambiente de trabajo más productivo. Lidera actividades para promover la diversidad en las contrataciones y ascensos de su equipo, participando y siendo incluidos en los programas de la compañía.',
GETDATE(),1026,49,1);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1026,'Valora la diversidad en el trabajo, incluye, interactua y reconoce la dignidad de todos los miembros del equipo, apreciando las cualidades que les hacen únicos. Impulsa su participación e inclusión en los programas de la compañía logrando que la comunicación sea abierta y que cada uno tenga toda la confianza para emitir su opinión.',
GETDATE(),1026,50,2);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1026,'Trabaja en equipo, respeta la diversidad de todos los miembros de su equipo para lograr que su equipo sea productivo. Modifica su comportamiento para adaptarse a la situación o a las personas.',
GETDATE(),1026,51,3);

INSERT INTO  [dbo].[PreguntasByEvaluacion] (Modulo_Id, Pregunta ,Fecha_Creacion, ModuloEvaluacionModelId_Modulo_Evaluacion, Numero_Pregunta, Tipo_Evaluacion_Id)
VALUES (1026,'Trabaja en equipo y respeta las diferencias que existen entre los miembros, fomenta la importancia que tiene pertenecer a un equipo diverso. Procura que el ambiente de trabajo esté orientado hacia el respeto, aprendizaje mutuo y el crecimiento.',
GETDATE(),1026,52,4);


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
