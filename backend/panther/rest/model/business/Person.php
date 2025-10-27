<?php

/**
 * <b>Descripcion:</b> Clase que <br/>contiene los usuarios de la aplicación
 * <b>Caso de Uso:</b> PANTHER-Seguridad <br/>
 *
 * @author Josué Nicolás Pinzón Villamil <a href = "mailto:jpinzon@j4sysol.com">jpinzon@j4sysol.com</a>
 */
class Person
{

    /**
     * Identificador de la clase
     *
     * @var float Id
     */
    public $id;

    /**
     * Nombre de usuario
     *
     * @var string user
     */
    public $name;

    /**
     * Contraseña de usuario
     *
     * @var string password
     */
    public $lastName;

    /**
     * Roles asociados
     *
     * @var Rol roles
     */
    public $phone;
    /**
     * @return the $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return the $name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return the $lastName
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * @return the $phone
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * @return the $document_type
     */
    public function getdocument_type()
    {
        return $this->document_type;
    }

    /**
     * @return the $IdentityDocument
     */
    public function getIdentityDocument()
    {
        return $this->IdentityDocument;
    }

    /**
     * @return the $email
     */
    public function getemail()
    {
        return $this->email;
    }

    /**
     * @return the idPais
     */
    public function getidPais()
    {
        return $this->idPais;
    }

    /**
     * @return the idEstado
     */
    public function getidEstado()
    {
        return $this->idEstado;
    }
    /**
     * @return the idCiudad
     */
    public function getidCiudad()
    {
        return $this->idCiudad;
    }

    /**
     * @param number $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @param string $lastName
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
    }

    /**
     * @param string $phone
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;
    }

    /**
     * @param string $document_type
     */
    public function setdocument_type($document_type)
    {
        $this->document_type = $document_type;
    }

    /**
     * @param string $IdentityDocument
     */
    public function setIdentityDocument($IdentityDocument)
    {
        $this->IdentityDocument = $IdentityDocument;
    }

    /**
     * @param string $email
     */
    public function setemail($email)
    {
        $this->email = $email;
    }

    /**
     * @param int $idPais
     */
    public function setidPais($idPais)
    {
        $this->idPais = $idPais;
    }

    /**
     * @param int $idEstado
     */
    public function setidEstado($idEstado)
    {
        $this->idEstado = $idEstado;
    }

    /**
     * @param int $idCiudad
     */
    public function setidCiudad($idCiudad)
    {
        $this->idCiudad = $idCiudad;
    }
    
}
?>

