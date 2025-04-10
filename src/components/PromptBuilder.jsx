import { useState } from "react";

export default function PromptBuilder() {
  const [output, setOutput] = useState("");
  const [form, setForm] = useState({
    prompt: "",
    art_style: "",
    color_palette: "",
    texture: "",
    lighting: "",
    format_hack: "",
    shot_type: "",
    angle: "",
    lens: "",
    depth_of_field: "",
    focus: "",
    symmetry: false,
    rule_of_thirds: false,
    leading_lines: false,
    framing_elements: "",
    negative_space: "",
    surreal_boosters: "",
    artist_reference: "",
    resolution: "",
    aspect_ratio: "",
    file_type: "",
    transparent_background: false,
    author: "",
    collection: "",
    tags: ""
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleCheckbox = (field) => {
    setForm({ ...form, [field]: !form[field] });
  };

  const generatePrompt = () => {
    const result = {
      prompt: form.prompt,
      style: {
        art_style: form.art_style,
        color_palette: form.color_palette,
        texture: form.texture,
        lighting: form.lighting,
        format_hack: form.format_hack
      },
      camera: {
        shot_type: form.shot_type,
        angle: form.angle,
        lens: form.lens,
        depth_of_field: form.depth_of_field,
        focus: form.focus
      },
      composition: {
        symmetry: form.symmetry,
        rule_of_thirds: form.rule_of_thirds,
        leading_lines: form.leading_lines,
        framing_elements: form.framing_elements,
        negative_space: form.negative_space
      },
      surreal_boosters: form.surreal_boosters.split(","),
      artist_reference: form.artist_reference.split(","),
      technical: {
        resolution: form.resolution,
        aspect_ratio: form.aspect_ratio,
        file_type: form.file_type,
        transparent_background: form.transparent_background
      },
      metadata: {
        author: form.author,
        collection: form.collection,
        tags: form.tags.split(",")
      }
    };
    setOutput(JSON.stringify(result, null, 2));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">AI Prompt Generator</h1>
      <textarea placeholder="Scene Description" className="w-full border p-2 rounded" onChange={(e) => handleChange("prompt", e.target.value)} />
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(form).map(([key, value]) => (
          typeof value === "boolean" ? (
            <label key={key} className="flex items-center space-x-2">
              <input type="checkbox" checked={form[key]} onChange={() => handleCheckbox(key)} />
              <span>{key}</span>
            </label>
          ) : (
            <input
              key={key}
              className="border p-2 rounded"
              placeholder={key.replace(/_/g, ' ')}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          )
        ))}
      </div>
      <button onClick={generatePrompt} className="bg-black text-white px-4 py-2 rounded">Generate</button>
      <textarea className="w-full border p-2 rounded mt-4 text-xs" rows={20} value={output} readOnly />
    </div>
  );
}
