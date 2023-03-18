-- Creación de tabla para proveedores
CREATE TABLE proveedores (
  id_proveedor INT PRIMARY KEY IDENTITY(1,1),
  nombre_proveedor VARCHAR(50) NOT NULL,
  direccion VARCHAR(100),
  telefono NUMERIC(20),
  email VARCHAR(50)
);

-- Creación de tabla para categorías
CREATE TABLE categorias (
  id_categoria INT PRIMARY KEY IDENTITY(1,1),
  nombre_categoria VARCHAR(50) NOT NULL
);

-- Creación de tabla para artículos
CREATE TABLE articulos (
  id_articulo INT PRIMARY KEY IDENTITY(1,1),
  nombre_articulo VARCHAR(50) NOT NULL,
  descripcion VARCHAR(100),
  precio DECIMAL(10, 2) NOT NULL,
  cantidad_disponible INT NOT NULL,
  id_categoria INT,
  FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- Creación de tabla para relación muchos a muchos entre proveedores y artículos
CREATE TABLE proveedores_articulos (
  id_proveedor INT,
  id_articulo INT,
  PRIMARY KEY (id_proveedor, id_articulo),
  FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor),
  FOREIGN KEY (id_articulo) REFERENCES articulos(id_articulo)
);

-- Creación de tabla para registro de facturación de proveedores
CREATE TABLE registro_facturacion (
  id_registro INT PRIMARY KEY IDENTITY(1,1),
  id_proveedor INT,
  id_articulo INT,
  fecha_compra DATE,
  fecha_entrega DATE,
  precio_unidad_compra DECIMAL(10, 2) NOT NULL,
  precio_total_compra DECIMAL(10, 2) NOT NULL,
  cantidad_compra INT NOT NULL,
  FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor),
  FOREIGN KEY (id_articulo) REFERENCES articulos(id_articulo)
);
