package iuh.fit.bai2;

public interface TaskSubject {
    void register(TaskObserver o);
    void unregister(TaskObserver o);
    void notifyObservers();
}
