<?php
class Documents extends Request
{
    /**
     * Datos de la tabla "documenttype"
     *
     * @var string
     */
    const NAME_TABLE = "documenttype";
    
    public static function init()
    {
        parent::$nameTable = self::NAME_TABLE;
        parent::$queryInsert = INTSERT_DOCUMENT;
        parent::$queryUpdate = UPDATE_DOCUMENT;
    }

    public static function updateParameter($object, $statement, $id)
    {
        $statement->bindParam(1, $object->nombre_corto);
        $statement->bindParam(2, $object->nombre_largo);
        $statement->bindParam(3, $id);
    }

    public static function insertParameter($object, $statement)
    {
        $statement->bindParam(1, $object->nombre_corto);
        $statement->bindParam(2, $object->nombre_largo);
    }

}