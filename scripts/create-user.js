
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tinoukchmdhrnsfxwzrg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpbm91a2NobWRocm5zZnh3enJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NTc1NzAsImV4cCI6MjA4MzAzMzU3MH0.xtBg3EfnrfTCs_KQZzltp2fkC8h64jpiSAJKYWjRUQc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdminUser() {
    const { data, error } = await supabase.auth.signUp({
        email: 'contato@automattus.com.br',
        password: 'admin',
    });

    if (error) {
        if (error.message.includes('Password should be at least')) {
            // Try with stronger password if 'admin' is too short (default is 6 chars)
            console.log("Senha 'admin' muito curta. Tentando 'admin123'...");
            const { data: data2, error: error2 } = await supabase.auth.signUp({
                email: 'contato@automattus.com.br',
                password: 'admin123',
            });
            if (error2) console.error('Erro ao criar usuário (tentativa 2):', error2.message);
            else console.log('Usuário criado com sucesso (senha: admin123)!');
        } else {
            console.error('Erro ao criar usuário:', error.message);
        }
    } else {
        console.log('Usuário criado com sucesso! Verifique seu email para confirmar (se necessário).');
    }
}

createAdminUser();
