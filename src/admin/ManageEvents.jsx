
import { useState } from "react";
import { useEvents } from "../data/EventsContext";
import { Edit, Trash2, Plus, X, Upload, Image as ImageIcon } from "lucide-react";

const emptyForm = {
  title: "",
  category: "Concert",
  date: "",
  location: "",
  price: "",
  image: "",
  description: "",
};

// Compress and resize an image before storing it
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const maxSize = 900;
        let width = img.width;
        let height = img.height;

        if (width > maxSize || height > maxSize) {
          const ratio = Math.min(maxSize / width, maxSize / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        // White background for images with transparency
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(img, 0, 0, width, height);

        const compressedImage = canvas.toDataURL("image/jpeg", 0.7);
        resolve(compressedImage);
      };

      img.onerror = () => reject(new Error("Unable to process image."));
      img.src = event.target.result;
    };

    reader.onerror = () => reject(new Error("Unable to read image."));
    reader.readAsDataURL(file);
  });
}

function ManageEvents() {
  const { events, updateEvents } = useEvents();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imageError, setImageError] = useState("");

  function handleChange(e) {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    // Reject unusually large original files
    if (file.size > 10 * 1024 * 1024) {
      setImageError("Image must be smaller than 10 MB.");
      e.target.value = "";
      return;
    }

    try {
      const compressedImage = await compressImage(file);

      setForm((previous) => ({
        ...previous,
        image: compressedImage,
      }));
    } catch {
      setImageError("Unable to process this image. Try another image.");
    }

    e.target.value = "";
  }

  function removeImage() {
    setForm((previous) => ({
      ...previous,
      image: "",
    }));

    setImageError("");
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setImageError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const eventData = {
      ...form,
      price: Number(form.price),
    };

    if (editingId) {
      const updatedEvents = events.map((event) =>
        event.id === editingId
          ? { ...event, ...eventData }
          : event
      );

      updateEvents(updatedEvents);
    } else {
      const newEvent = {
        ...eventData,
        id: `EVT-${Date.now()}`,
      };

      updateEvents([newEvent, ...events]);
    }

    resetForm();
  }

  function handleEdit(event) {
    setForm({
      title: event.title,
      category: event.category,
      date: event.date,
      location: event.location,
      price: event.price,
      image: event.image || "",
      description: event.description,
    });

    setImageError("");
    setEditingId(event.id);
    setShowForm(true);
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this event?")) return;

    updateEvents(events.filter((event) => event.id !== id));

    if (editingId === id) {
      resetForm();
    }
  }

  return (
    <div className="container admin-events-page">
      <div className="admin-page-header">
        <div>
          <h1>Manage Events</h1>
          <p>Add, edit and manage event listings.</p>
        </div>

        <button
          className="btn-primary-custom"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>

      {showForm && (
        <div className="admin-section-card">
          <div className="form-header">
            <h2>{editingId ? "Edit Event" : "Add New Event"}</h2>

            <button className="icon-button" onClick={resetForm}>
              <X />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="admin-event-form">
            <div className="form-group">
              <label>Event Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option>Concert</option>
                <option>Sports</option>
                <option>Movies</option>
                <option>Comedy</option>
                <option>Workshop</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Ticket Price</label>
              <input
                type="number"
                name="price"
                min="0"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="form-group full-width">
              <label>Event Image</label>

              <label className="image-upload-box">
                <Upload size={22} />
                <span>
                  {form.image
                    ? "Choose another image"
                    : "Click to upload an image"}
                </span>
                <small>JPG, PNG, WEBP (Maximum 10 MB)</small>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                />
              </label>

              {imageError && (
                <p className="auth-error">{imageError}</p>
              )}

              {form.image && (
                <div className="image-preview-container">
                  <img
                    src={form.image}
                    alt="Event preview"
                    className="event-image-preview"
                  />

                  <button
                    type="button"
                    className="btn-danger-custom"
                    onClick={removeImage}
                  >
                    <Trash2 size={16} />
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="form-actions full-width">
              <button type="submit" className="btn-primary-custom">
                {editingId ? "Update Event" : "Create Event"}
              </button>

              <button
                type="button"
                className="btn-secondary-custom"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-section-card">
        <h2>All Events ({events.length})</h2>

        {events.length === 0 ? (
          <div className="empty-state">
            <p>No events available.</p>
          </div>
        ) : (
          <div className="admin-event-list">
            {events.map((event) => (
              <div className="admin-event-item" key={event.id}>
                {event.image ? (
                  <img src={event.image} alt={event.title} />
                ) : (
                  <div className="event-image-placeholder">
                    <ImageIcon size={30} />
                  </div>
                )}

                <div className="admin-event-info">
                  <h3>{event.title}</h3>
                  <p>{event.category}</p>
                  <p>{event.location}</p>
                  <p>
                    {new Date(
                      event.date + "T00:00:00"
                    ).toLocaleDateString()}
                  </p>
                  <strong>₹{event.price}</strong>
                </div>

                <div className="admin-event-actions">
                  <button
                    className="btn-secondary-custom"
                    onClick={() => handleEdit(event)}
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    className="btn-danger-custom"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageEvents;
