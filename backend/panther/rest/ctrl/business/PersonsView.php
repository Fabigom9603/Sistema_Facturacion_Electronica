<?php

class PersonsView extends Request
{
    /**
     * Datos de la tabla "personsView"
     *
     * @var string
     */
    const NAME_TABLE = "personsview";
    
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
        $statement->bindParam(4, $object->IdentityDocument);
        $statement->bindParam(5, $object->email);
        $statement->bindParam(6, $id);
    }

    public static function insertParameter($object, $statement)
    {
        $statement->bindParam(1, $object->name);
        $statement->bindParam(2, $object->lastName);
        $statement->bindParam(3, $object->phone);
        $statement->bindParam(4, $object->IdentityDocument);
        $statement->bindParam(5, $object->email);
    }
}    
