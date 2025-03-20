<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = [
            [
                'name' => 'Task Admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('admin@admin'),
            ],
            [
                'name' => 'Task User',
                'email' => 'user@gmail.com',
                'password' => Hash::make('admin@admin'),
            ],
        ];

        User::insert($user);
    }
}
