import { useEffect } from "react";

const AGENT_SRC =
  "https://timeweb.cloud/api/v1/cloud-ai/agents/87b4cdba-9aef-4208-89bc-da3ab33213ce/embed.js?collapsed=true";

export default function AiAgent() {
  useEffect(() => {
    if (document.querySelector('script[data-tw-agent="1"]')) return;
    const script = document.createElement("script");
    script.src = AGENT_SRC;
    script.async = true;
    script.setAttribute("data-tw-agent", "1");
    document.body.appendChild(script);
  }, []);

  return null;
}
