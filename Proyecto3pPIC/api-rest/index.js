import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'db_estudiantes'
});

db.connect(error => {
    if (error) {
        console.log("Error al establecer la conexión");
        return;
    }
    console.log("Conexión exitosa");
});

app.listen(5000, () => {
    console.log("Server listening on Port 5000");
});

app.get("/", (req, res) => {
    res.send("Bienvenidos a la API de estudiantes");
});

// CRUD para estudiantes
app.get("/estudiantes", (req, res) => {
    const query = "SELECT * FROM estudiante";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al recibir datos');
            return;
        }
        res.status(200).json(results);
    });
});

app.post("/estudiantes", (req, res) => {
    const { nombre, apellido, numero_identificacion } = req.body;
    const query = "INSERT INTO estudiante(nombre, apellido, numero_identificacion) VALUES(?,?,?)";
    db.query(query, [nombre, apellido, numero_identificacion], (error, results) => {
        if (error) {
            res.status(500).json('Error al registrar el estudiante');
            return;
        }
        res.status(200).json(`Estudiante registrado con el ID: ${results.insertId}`);
    });
});

app.put("/estudiantes/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, numero_identificacion } = req.body;
    const query = "UPDATE estudiante SET nombre = ?, apellido = ?, numero_identificacion = ? WHERE id_estudiante = ?";

    db.query(query, [nombre, apellido, numero_identificacion, id], (error, results) => {
        if (error) {
            res.status(500).json('Error al actualizar el estudiante');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Estudiante no encontrado');
            return;
        }
        res.status(200).json(`Estudiante con ID: ${id} actualizado correctamente`);
    });
});

app.delete("/estudiantes/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM estudiante WHERE id_estudiante = ?";

    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json('Error al eliminar el estudiante');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Estudiante no encontrado');
            return;
        }
        res.status(200).json(`Estudiante con ID: ${id} eliminado correctamente`);
    });
});

// CRUD para materias
app.get("/materias", (req, res) => {
    const query = "SELECT * FROM materia";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al recibir datos');
            return;
        }
        res.status(200).json(results);
    });
});

app.post("/materias", (req, res) => {
    const { nombre_materia } = req.body;
    const query = "INSERT INTO materia(nombre_materia) VALUES(?)";
    db.query(query, [nombre_materia], (error, results) => {
        if (error) {
            res.status(500).json('Error al registrar la materia');
            return;
        }
        res.status(200).json(`Materia registrada con el ID: ${results.insertId}`);
    });
});

app.put("/materias/:id", (req, res) => {
    const { id } = req.params;
    const { nombre_materia } = req.body;
    const query = "UPDATE materia SET nombre_materia = ? WHERE id_materia = ?";

    db.query(query, [nombre_materia, id], (error, results) => {
        if (error) {
            res.status(500).json('Error al actualizar la materia');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Materia no encontrada');
            return;
        }
        res.status(200).json(`Materia con ID: ${id} actualizada correctamente`);
    });
});

app.delete("/materias/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM materia WHERE id_materia = ?";

    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json('Error al eliminar la materia');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Materia no encontrada');
            return;
        }
        res.status(200).json(`Materia con ID: ${id} eliminada correctamente`);
    });
});

// CRUD para matrículas
app.get("/matriculas", (req, res) => {
    const query = "SELECT * FROM matricula";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al recibir datos');
            return;
        }
        res.status(200).json(results);
    });
});

app.post("/matriculas", (req, res) => {
    const { id_estudiante, id_materia, calificacion } = req.body;
    const query = "INSERT INTO matricula(id_estudiante, id_materia, calificacion) VALUES(?,?,?)";
    db.query(query, [id_estudiante, id_materia, calificacion], (error, results) => {
        if (error) {
            res.status(500).json('Error al registrar la matrícula');
            return;
        }
        res.status(200).json(`Matrícula registrada con el ID: ${results.insertId}`);
    });
});

app.put("/matriculas/:id", (req, res) => {
    const { id } = req.params;
    const { id_estudiante, id_materia, calificacion } = req.body;
    const query = "UPDATE matricula SET id_estudiante = ?, id_materia = ?, calificacion = ? WHERE id_matricula = ?";

    db.query(query, [id_estudiante, id_materia, calificacion, id], (error, results) => {
        if (error) {
            res.status(500).json('Error al actualizar la matrícula');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Matrícula no encontrada');
            return;
        }
        res.status(200).json(`Matrícula con ID: ${id} actualizada correctamente`);
    });
});

app.delete("/matriculas/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM matricula WHERE id_matricula = ?";

    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json('Error al eliminar la matrícula');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Matrícula no encontrada');
            return;
        }
        res.status(200).json(`Matrícula con ID: ${id} eliminada correctamente`);
    });
});

// CRUD para reportes
app.get("/reportes", (req, res) => {
    const query = "SELECT * FROM reporte";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al recibir datos');
            return;
        }
        res.status(200).json(results);
    });
});

app.post("/reportes", (req, res) => {
    const { id_estudiante, promedio } = req.body;
    const query = "INSERT INTO reporte(id_estudiante, promedio) VALUES(?,?)";
    db.query(query, [id_estudiante, promedio], (error, results) => {
        if (error) {
            res.status(500).json('Error al registrar el reporte');
            return;
        }
        res.status(200).json(`Reporte registrado con el ID: ${results.insertId}`);
    });
});

app.put("/reportes/:id", (req, res) => {
    const { id } = req.params;
    const { id_estudiante, promedio } = req.body;
    const query = "UPDATE reporte SET id_estudiante = ?, promedio = ? WHERE id_reporte = ?";

    db.query(query, [id_estudiante, promedio, id], (error, results) => {
        if (error) {
            res.status(500).json('Error al actualizar el reporte');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Reporte no encontrado');
            return;
        }
        res.status(200).json(`Reporte con ID: ${id} actualizado correctamente`);
    });
});

app.delete("/reportes/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM reporte WHERE id_reporte = ?";

    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json('Error al eliminar el reporte');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Reporte no encontrado');
            return;
        }
        res.status(200).json(`Reporte con ID: ${id} eliminado correctamente`);
    });
});
