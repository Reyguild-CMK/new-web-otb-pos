"use client";

export function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="flex justify-end md:px-8 px-2 py-2 text-xs text-gray-medium bottom-0 h-footer">
            <div>Copyright SGK &copy; {year}</div>
        </footer>
    );
}