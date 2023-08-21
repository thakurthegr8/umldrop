import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://svyypjsgedqqrrnxrxwr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2eXlwanNnZWRxcXJybnhyeHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2MzI1MTMsImV4cCI6MjAwODIwODUxM30.mMgS_QBW8NAwadYXeTOhWmdrEfTjFhWcFzYqEyem5NA",
  { auth: { persistSession: false } }
);

export default supabaseClient;
