package iuh.fit;

public class File implements FileSystemItem {
    private String name;
    private String content;

    public File(String name, String content) {
        this.name = name;
        this.content = content;
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "- File: " + name);
    }
}