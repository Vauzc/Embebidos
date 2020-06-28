--
-- Base de datos: `UNAL`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `convocatorias`
--

CREATE TABLE `convocatorias` (
  `cod` int(11) NOT NULL,
  `facultad` varchar(100) NOT NULL,
  `modalidad` varchar(20) NOT NULL,
  `para` varchar(15) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `est_req` int(11) NOT NULL,
  `horas` tinyint(4) NOT NULL,
  `pago` int(11) NOT NULL
)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gea_personal`
--

CREATE TABLE `gea_personal` (
  `cod` int(11) NOT NULL,
  `responsable` varchar(50) NOT NULL,
  `reserva` int(11) DEFAULT NULL,
  `hora_inicio` datetime NOT NULL,
  `hora_fin` datetime DEFAULT NULL,
  `activo` bit(1) NOT NULL,
  `comentarios` varchar(200) DEFAULT NULL,
  `materia` bigint(20) DEFAULT NULL
)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupose`
--

CREATE TABLE `grupose` (
  `cod` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `lineas` varchar(2000) DEFAULT NULL,
  `dept` varchar(100) DEFAULT NULL,
  `link` varchar(5000) DEFAULT NULL,
  `facultad` varchar(100) NOT NULL,
  `tipo` tinyint(4) DEFAULT NULL
)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gruposu`
--

CREATE TABLE `gruposu` (
  `cod` int(11) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `descripcion` varchar(5000) DEFAULT NULL,
  `lineas` varchar(2000) DEFAULT NULL,
  `dept` varchar(500) DEFAULT NULL,
  `link` varchar(5000) DEFAULT NULL,
  `facultad` varchar(100) NOT NULL,
  `tipo` varchar(100) DEFAULT NULL
)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `laboral`
--

CREATE TABLE `laboral` (
  `cod` int(11) NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `tiempo` varchar(40) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `avance` varchar(10) NOT NULL,
  `cierre` varchar(20) NOT NULL,
  `link` varchar(5000) NOT NULL
)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `cod` bigint(20) NOT NULL,
  `codigo` varchar(15) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `creditos` tinyint(4) DEFAULT NULL,
  `tipologia` varchar(60) DEFAULT NULL,
  `descripcion` varchar(10000) DEFAULT NULL,
  `facultad` varchar(100) DEFAULT NULL,
  `carrera` varchar(100) DEFAULT NULL
)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesas`
--

CREATE TABLE `mesas` (
  `num` int(11) NOT NULL,
  `estado` bit(1) DEFAULT NULL
)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `cod` int(11) NOT NULL,
  `fecha` varchar(20) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `imagen` varchar(5000) DEFAULT NULL,
  `link` varchar(5000) DEFAULT NULL
)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posgrado`
--

CREATE TABLE `posgrado` (
  `cod` smallint(6) NOT NULL,
  `tipologia` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `facultad` varchar(100) NOT NULL
)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `cod` int(11) NOT NULL,
  `responsable` varchar(50) NOT NULL,
  `mesa` int(11) NOT NULL,
  `hora_inicio` datetime NOT NULL,
  `hora_fin` datetime NOT NULL
)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutorias_institucionales`
--

CREATE TABLE `tutorias_institucionales` (
  `cod` int(11) NOT NULL,
  `area` varchar(100) NOT NULL,
  `materia` varchar(100) NOT NULL,
  `fecha` varchar(20) DEFAULT NULL,
  `dia` varchar(10) DEFAULT NULL,
  `hora` varchar(15) DEFAULT NULL,
  `lugar` varchar(20) DEFAULT NULL
)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `usuario` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `avance` float DEFAULT NULL,
  `papa` float DEFAULT NULL,
  `carrera` varchar(100) DEFAULT NULL,
  `facultad` varchar(100) DEFAULT NULL,
  `materias` varchar(10000) DEFAULT NULL
)

--
-- Llaves
--

--
-- Llaves de la tabla `convocatorias`
--
ALTER TABLE `convocatorias`
  ADD PRIMARY KEY (`cod`);

--
-- Llaves de la tabla `gea_personal`
--
ALTER TABLE `gea_personal`
  ADD PRIMARY KEY (`cod`),
  ADD KEY `responsable` (`responsable`),
  ADD KEY `reserva` (`reserva`),
  ADD KEY `materia` (`materia`);

--
-- Llaves de la tabla `grupose`
--
ALTER TABLE `grupose`
  ADD PRIMARY KEY (`cod`);

--
-- Llaves de la tabla `gruposu`
--
ALTER TABLE `gruposu`
  ADD PRIMARY KEY (`cod`);

--
-- Llaves de la tabla `laboral`
--
ALTER TABLE `laboral`
  ADD PRIMARY KEY (`cod`);

--
-- Llaves de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`cod`);

--
-- Llaves de la tabla `mesas`
--
ALTER TABLE `mesas`
  ADD PRIMARY KEY (`num`);

--
-- Llaves de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`cod`);

--
-- Llaves de la tabla `posgrado`
--
ALTER TABLE `posgrado`
  ADD PRIMARY KEY (`cod`);

--
-- Llaves de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`cod`),
  ADD KEY `responsable` (`responsable`),
  ADD KEY `mesa` (`mesa`);

--
-- Llaves de la tabla `tutorias_institucionales`
--
ALTER TABLE `tutorias_institucionales`
  ADD PRIMARY KEY (`cod`);

--
-- Llaves de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `gea_personal`
--
ALTER TABLE `gea_personal`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `grupose`
--
ALTER TABLE `grupose`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `gruposu`
--
ALTER TABLE `gruposu`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `cod` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `posgrado`
--
ALTER TABLE `posgrado`
  MODIFY `cod` smallint(6) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tutorias_institucionales`
--
ALTER TABLE `tutorias_institucionales`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT;

--
-- Llaves foráneas para tablas volcadas
--

--
-- Llaves foráneas para la tabla `gea_personal`
--
ALTER TABLE `gea_personal`
  ADD CONSTRAINT `gea_personal_ibfk_1` FOREIGN KEY (`responsable`) REFERENCES `usuario` (`usuario`),
  ADD CONSTRAINT `gea_personal_ibfk_2` FOREIGN KEY (`reserva`) REFERENCES `reserva` (`cod`),
  ADD CONSTRAINT `gea_personal_ibfk_3` FOREIGN KEY (`materia`) REFERENCES `materia` (`cod`);

--
-- Llaves foráneas para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`responsable`) REFERENCES `usuario` (`usuario`),
  ADD CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`mesa`) REFERENCES `mesas` (`num`);

