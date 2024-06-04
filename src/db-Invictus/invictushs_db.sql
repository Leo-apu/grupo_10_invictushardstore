CREATE DATABASE IF NOT EXISTS invictushs_db;
USE invictushs_db;

CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Administrador', NULL, NULL),
(2, 'Usuario', NULL, NULL);


CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Almacenamiento', 'A', NULL, NULL),
(2, 'Fuentes', 'F', NULL, NULL),
(3, 'Placas de Video', 'PV', NULL, NULL),
(4, 'Memorias RAM', 'MR', NULL, NULL),
(5, 'Procesadores', 'P', NULL, NULL),
(6, 'Motherboards', 'M', NULL, NULL),
(7, 'Gabinetes', 'G', NULL, NULL);


CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    roles_id INT,
    img VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (roles_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(5, 2),
    img VARCHAR(255) DEFAULT NULL,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO `products` (`id`, `name`, `description`, `price`, `img`, `category_id`, `created_at`, `updated_at`) VALUES
(10, 'Memoria Team DDR5 64GB (2x32GB) 6000Mhz T-CREATE EXPERT CL34 Black Intel XMP 3.0 / AMD EXPO', 'Capacidad 64 gb\r\nVelocidad 6000 mhz\r\nTipo DDR5\r\nCantidad De Memorias 2\r\nLatencia 34 cl\r\nVoltaje 1.35 v', 279900.00, 'prod-bd-1714421483767.jpg', 4, '2024-04-29 20:11:23', '2024-04-29 20:11:23'),
(11, 'Placa de Video XFX Radeon RX 580 8GB GDDR5 GTS 2048SP', ' Tipo pcie\r\nChipset Gpu RX 580\r\nEntrada Video No\r\nPuente Para Sli/croosfirex No\r\nDoble Puente No\r\n\r\nDIMENSIONES\r\nAncho De La Placa 120 mm\r\nLargo De La Placa 270 mm\r\nEspesor De La Placa 2.0 slots', 185400.00, 'prod-bd-1714421941826.jpg', 3, '2024-04-29 20:19:01', '2024-04-30 14:33:17'),
(12, 'Gabinete Antec NX292 MESH RGB Vidrio Templado', 'Factor Mother ITX,M-ATX,ATX,E-ATX\r\nFuente En Posición Superior No\r\nCon Ventana Si\r\nTipo De Ventana Vidrio templado\r\nColores Negro', 113265.00, 'prod-bd-1714422081396.jpg', 7, '2024-04-29 20:21:21', '2024-04-29 20:21:21'),
(13, '4 fotos Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler ', 'Modelo Ryzen 3 3200G\r\nSocket  AM4 APU 2th Gen\r\nNúcleos  4\r\nFrecuencia  3600.00 mhz\r\nProceso De Fabricación 12 nm\r\nChipset Gpu Radeon Vega 8\r\nHilos 4\r\nFrecuencia Turbo 4000 mhz\r\nFamilia AMD RYZEN 3', 105050.00, 'prod-bd-1714422326512.jpg', 5, '2024-04-29 20:25:26', '2024-04-29 20:25:26'),
(16, 'Fuente Corsair 550W 80 Plus Bronze CV550', 'Watts Nominal 550 w\r\nWatts Reales 528 w\r\nFormato ATX\r\nCompatible Con Posición Inferior Si\r\nCertificacion 80 Plus 80 PLUS Bronze\r\nModo Híbrido No\r\nTipo De Cableado Cables fijos\r\nAmpers En Linea +12V 44 a\r\nFuente Digital No\r\nColor Negro\r\nIluminación Sin Iluminación', 141660.00, 'prod-bd-1714487123474.jpg', 2, '2024-04-30 14:25:23', '2024-04-30 14:25:23'),
(17, 'Procesador Intel Core i5 14400F 4.7GHz Turbo Socket 1700 Raptor Lake', 'Modelo 14400F\r\nSocket 1700 Raptor Lake \r\nNúcleos 10\r\nFrecuencia 2500.00 mhz\r\nProceso De Fabricación 10 nm\r\nHilos 16\r\nFrecuencia Turbo 4700 mhz\r\nFamilia Intel Core i5', 304600.00, 'prod-bd-1714487276766.jpg', 5, '2024-04-30 14:27:56', '2024-04-30 14:27:56'),
(18, 'Memoria Team DDR5 32GB (2x16GB) 6400MHz T-Force Delta RGB Black CL40 Intel XMP 3.0', 'Capacidad 32 gb\r\nVelocidad 6400 mhz\r\nTipo DDR5\r\nCantidad De Memorias 2\r\nLatencia 40 cl\r\nVoltaje 1.35 v', 173250.00, 'prod-bd-1714487400168.jpg', 4, '2024-04-30 14:30:00', '2024-04-30 14:30:00'),
(19, 'Gabinete Kolink Inspire K8 Vidrio Templado 1x120mm ARGB', 'Factor Mother ITX,M-ATX,ATX\r\nFuente En Posición Superior No\r\nCon Ventana Si\r\nTipo De Ventana Vidrio templado\r\nColores Negro\r\nAncho 200 mm\r\nAlto 426 mm\r\nProfundidad 362 mm', 79000.00, 'prod-bd-1714487581535.jpg', 7, '2024-04-30 14:33:01', '2024-04-30 14:33:01');
