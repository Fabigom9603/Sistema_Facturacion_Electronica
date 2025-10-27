<?php

/**
 * <b>Descripcion:</b> Clase que <br/>contiene los usuarios de la aplicación
 * <b>Caso de Uso:</b> PANTHER-Seguridad <br/>
 *
 * @author Josué Nicolás Pinzón Villamil <a href = "mailto:jpinzon@j4sysol.com">jpinzon@j4sysol.com</a>
 */
class Document
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
     * @var string nombre_corto
     */
    public $nombre_corto;

    /**
     * Contraseña de usuario
     *
     * @var string nombre_largo
     */
    public $nombre_largo;

    
    /**
     * @return the $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return the $nombre_corto
     */
    public function getnombre_corto()
    {
        return $this->nombre_corto;
    }

    /**
     * @return the $nombre_largo
     */
    public function getnombre_largo()
    {
        return $this->nombre_largo;
    }

    /**
     * @param number $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @param string $nombre_corto
     */
    public function setnombre_corto($nombre_corto)
    {
        $this->nombre_corto = $nombre_corto;
    }

    /**
     * @param string $nombre_largo
     */
    public function setnombre_largo($nombre_largo)
    {
        $this->nombre_largo = $nombre_largo;
    }

       
}
?>
