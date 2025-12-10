<?php

namespace App\Http\Controllers;

use App\Models\Umission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UmissionController extends Controller
{

    public function index()
    {
        $umissions = Umission::all();

        return inertia('Worklog/deptList', [
            'umissions' => $umissions,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'startTime' => 'nullable|date_format:H:i',
            'endTime' => 'nullable|date_format:H:i',
            'taskDescription' => 'required|string',
            'status' => 'nullable|string',
        ]);

        Worklog::create([
            'employee_id' => Auth::user()->employee_id,
            'date' => $validated['date'],
            'startTime' => $validated['startTime'] ?? null,
            'endTime' => $validated['endTime'] ?? null,
            'taskDescription' => $validated['taskDescription'],
            'status' => $validated['status'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Worklog added successfully!');
    }
}
