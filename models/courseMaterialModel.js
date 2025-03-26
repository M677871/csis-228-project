class CourseMaterial {
    constructor(materialId, courseId, title, materialType, filePath,createAt) {
        this.materialId = materialId;
        this.courseId = courseId;
        this.title = title;
        this.materialType = materialType;
        this.filePath = filePath;
        this.createAt = createAt;
    }
    static fromRow(row) {
        return new CourseMaterial(
            row.material_id,
            row.course_id,
            row.title,
            row.material_type,
            row.file_path,
            row.create_at
        );
       
    }
}
module.exports = CourseMaterial;