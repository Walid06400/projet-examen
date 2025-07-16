<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TrainingResource\Pages;
use App\Models\Training;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class TrainingResource extends Resource
{
    protected static ?string $model = Training::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';
    
    protected static ?string $navigationGroup = 'Contenu';
    
    protected static ?string $navigationLabel = 'Formations';
    
    protected static ?string $pluralModelLabel = 'Formations';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informations principales')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Titre de la formation')
                            ->required()
                            ->maxLength(255)
                            ->reactive()
                            ->afterStateUpdated(fn ($state, callable $set) => 
                                $set('slug', Str::slug($state))
                            ),
                            
                        Forms\Components\TextInput::make('slug')
                            ->label('Slug (URL)')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->helperText('URL de la formation (généré automatiquement)'),
                            
                        Forms\Components\Textarea::make('description')
                            ->label('Description')
                            ->required()
                            ->rows(4)
                            ->helperText('Description courte de la formation'),
                    ])
                    ->columns(2),
                    
                Forms\Components\Section::make('Détails de la formation')
                    ->schema([
                        Forms\Components\TextInput::make('price')
                            ->label('Prix (€)')
                            ->required()
                            ->numeric()
                            ->prefix('€')
                            ->minValue(0)
                            ->step(0.01),
                            
                        Forms\Components\Select::make('level')
                            ->label('Niveau')
                            ->options([
                                'Débutant' => 'Débutant',
                                'Confirmé' => 'Confirmé',
                                'Pro' => 'Pro',
                            ])
                            ->default('Débutant')
                            ->required(),
                            
                        Forms\Components\Select::make('subject')
                            ->label('Sujet')
                            ->options([
                                'Production' => 'Production',
                                'Mixage' => 'Mixage',
                                'Mastering' => 'Mastering',
                                'Programmation' => 'Programmation',
                                'Sound Design' => 'Sound Design',
                            ])
                            ->default('Production')
                            ->required(),
                            
                        Forms\Components\TextInput::make('duration')
                            ->label('Durée (heures)')
                            ->numeric()
                            ->suffix('h')
                            ->helperText('Durée estimée de la formation'),
                    ])
                    ->columns(2),
                    
                Forms\Components\Section::make('Image et contenu')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->label('Image de la formation')
                            ->disk('public')
                            ->directory('trainings')
                            ->image()
                            ->maxSize(4096) // 4Mo
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('16:9')
                            ->imageResizeTargetWidth('1200')
                            ->imageResizeTargetHeight('675')
                            ->helperText('Format recommandé : 1200x675px (16:9)'),
                            
                        Forms\Components\RichEditor::make('content')
                            ->label('Contenu détaillé')
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'blockquote',
                                'bold',
                                'bulletList',
                                'codeBlock',
                                'h2',
                                'h3',
                                'italic',
                                'link',
                                'orderedList',
                                'redo',
                                'strike',
                                'undo',
                            ])
                            ->helperText('Description complète du contenu de la formation'),
                    ]),
                    
                Forms\Components\Section::make('Paramètres avancés')
                    ->schema([
                        Forms\Components\Toggle::make('is_featured')
                            ->label('Formation à la une')
                            ->helperText('Afficher cette formation sur la page d\'accueil'),
                            
                        Forms\Components\Toggle::make('is_active')
                            ->label('Formation active')
                            ->default(true)
                            ->helperText('Désactiver pour masquer temporairement'),
                            
                        Forms\Components\TextInput::make('badge')
                            ->label('Badge (optionnel)')
                            ->maxLength(50)
                            ->helperText('Ex: "Nouveau", "Populaire", "Promo"'),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Image')
                    ->circular()
                    ->size(60),
                    
                Tables\Columns\TextColumn::make('title')
                    ->label('Titre')
                    ->searchable()
                    ->sortable()
                    ->limit(40),
                    
                Tables\Columns\TextColumn::make('subject')
                    ->label('Sujet')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Production' => 'success',
                        'Mixage' => 'info',
                        'Mastering' => 'warning',
                        'Programmation' => 'danger',
                        'Sound Design' => 'primary',
                        default => 'gray',
                    }),
                    
                Tables\Columns\TextColumn::make('level')
                    ->label('Niveau')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Débutant' => 'success',
                        'Confirmé' => 'warning',
                        'Pro' => 'danger',
                        default => 'gray',
                    }),
                    
                Tables\Columns\TextColumn::make('price')
                    ->label('Prix')
                    ->money('EUR')
                    ->sortable(),
                    
                Tables\Columns\IconColumn::make('is_featured')
                    ->label('À la une')
                    ->boolean()
                    ->trueIcon('heroicon-o-star')
                    ->falseIcon('heroicon-o-star')
                    ->trueColor('warning')
                    ->falseColor('gray'),
                    
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('danger'),
                    
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Créée le')
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('subject')
                    ->label('Sujet')
                    ->options([
                        'Production' => 'Production',
                        'Mixage' => 'Mixage',
                        'Mastering' => 'Mastering',
                        'Programmation' => 'Programmation',
                        'Sound Design' => 'Sound Design',
                    ])
                    ->multiple(),
                    
                Tables\Filters\SelectFilter::make('level')
                    ->label('Niveau')
                    ->options([
                        'Débutant' => 'Débutant',
                        'Confirmé' => 'Confirmé',
                        'Pro' => 'Pro',
                    ])
                    ->multiple(),
                    
                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('À la une'),
                    
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Formation active'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('toggle_featured')
                        ->label('Basculer "À la une"')
                        ->icon('heroicon-o-star')
                        ->action(fn ($records) => $records->each(fn ($record) => 
                            $record->update(['is_featured' => !$record->is_featured])
                        )),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTrainings::route('/'),
            'create' => Pages\CreateTraining::route('/create'),
            'edit' => Pages\EditTraining::route('/{record}/edit'),
        ];
    }
}
