<?php

/**
 * <b>Descripcion:</b> Clase que <br/>Gestiona las personas
 * <b>Caso de Uso:</b> PANTHER- Business <br/>
 *
 * @author Josué Nicolás Pinzón Villamil <a href = "mailto:jpinzon@j4sysol.com">jpinzon@j4sysol.com</a>
 */
class Persons extends Request
{
    /**
     * Datos de la tabla "person"
     *
     * @var string
     */
    const NAME_TABLE = "person";
    
    public static function init()
    {
        parent::$nameTable = self::NAME_TABLE;
        parent::$queryInsert = INTSERT_PERSON;
        parent::$queryUpdate = UPDATE_PERSON;
    }

    public static function updateParameter($object, $statement, $id)
    {
        $statement->bindParam(1, $object->name);
        $statement->bindParam(2, $object->lastName);
        $statement->bindParam(3, $object->phone);
        $statement->bindParam(4, $object->document_type);
        $statement->bindParam(5, $object->IdentityDocument);
        $statement->bindParam(6, $object->email);
        $statement->bindParam(7, $object->idPais);
        $statement->bindParam(8, $object->idEstado);
        $statement->bindParam(9, $object->idCiudad);
        $statement->bindParam(10, $id);
    }

    public static function insertParameter($object, $statement)
    {
        $statement->bindParam(1, $object->name);
        $statement->bindParam(2, $object->lastName);
        $statement->bindParam(3, $object->phone);
        $statement->bindParam(4, $object->document_type);
        $statement->bindParam(5, $object->IdentityDocument);
        $statement->bindParam(6, $object->email);
        $statement->bindParam(7, $object->idPais);
        $statement->bindParam(8, $object->idEstado);
        $statement->bindParam(9, $object->idCiudad);
    }

}

