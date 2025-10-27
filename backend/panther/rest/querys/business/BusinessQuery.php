<?php
/**
 * <b>Descripcion:</b> Clase que <br/> contiene las consultas de la aplicación
 * <b>Caso de Uso:</b> PANTHER-Business <br/>
 *
 * @author Josué Nicolás Pinzón Villamil <a href = "mailto:jpinzon@j4sysol.com">jpinzon@j4sysol.com</a>
 */

/**
 * Constante de consultas base de datos
 */
define("INTSERT_PERSON", "INSERT INTO person(name, lastName, phone,document_type,IdentityDocument,email,idPais,idEstado,idCiudad) VALUES (?,?,?,?,?,?,?,?,?);");
define("UPDATE_PERSON", "UPDATE person SET name=?, lastName =? , phone=? , document_type=? , IdentityDocument=? , email=? , idPais=?, idEstado=? , idCiudad=? WHERE id=? ;");

define("INTSERT_DOCUMENT", "INSERT INTO documenttype(nombre_corto, nombre_largo) VALUES (?,?);");
define("UPDATE_DOCUMENT", "UPDATE documenttype SET nombre_corto=?, nombre_largo =?  WHERE id=? ;");

?>
